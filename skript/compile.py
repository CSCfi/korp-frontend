#!/usr/bin/python
# -*- coding: utf-8 -*-
import re
import argparse
import json
import markdown
import codecs
from time import strftime
from os import walk

commentRegexp = re.compile(r'\<\!--.*?--\>')
augCommentRegexp = re.compile(r'\s(?=\<\!--.*?--\>)')
augISOdateRegexp = re.compile(r'(\d{4}-\d{2}-\d{2})\s?([a-z]?)')

def process_language(obj):
    language = {}
    items = re.split(augCommentRegexp, obj)
    # Find out time and possibly an ID
    for item in items:
        comments = commentRegexp.findall(item)
        if comments:
            header = comments[0].strip()[4:-3].strip()
            datepart = augISOdateRegexp.findall(header)
            if datepart:
                #title = header.rsplit(' ', 1)[0].strip()
                title = re.split(augISOdateRegexp, header)[0]
                (date, id_extension) = datepart[0]
                key = date + id_extension
                main_text = re.sub(commentRegexp, "", item).strip()
                lang_obj = {"t" : title, "d" : date, "h" : main_text}
                if len(datepart) > 1: # if there is a second date then that's the expiration date
                    lang_obj["e"] = datepart[1][0]
                language["".join(key)] = lang_obj
    return language

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("directory")
    parser.add_argument("default_language")
    parser.add_argument("limit")
    parser.add_argument('--pretty', action='store_true')
    parser.add_argument('--secondary')

    args = parser.parse_args()
    def_lang = args.default_language
    files = [[], []]

    paths = [args.directory]
    if args.secondary:
        paths.append(args.secondary)

    for i, path in enumerate(paths):
        for (dirpath, dirnames, filenames) in walk(path):
            for fn in filenames:
                if fn.endswith(".txt"):
                    files[i].append(fn)

    languages = {}

    for i in range(len(paths)):
        for f in files[i]:
            input_file = codecs.open(paths[i] + "/" + f, mode="r", encoding="utf-8")
            text = input_file.read()
            html = markdown.markdown(text)
            lname = f.split(".")[0]
            proc = process_language(html)
            if lname in languages:
                languages[lname] = dict(proc.items() + languages[lname].items())
            else:
                languages[lname] = proc

    # Derive final structure from the languages
    out = []
    default = languages[def_lang]
    for n_key in sorted(default.iterkeys(), reverse=True):
        in_item = default[n_key];
        out_item = {"t": { def_lang : in_item["t"] },
                    "h" : { def_lang : in_item["h"] },
                    "d" : in_item["d"]}
        if "e" in in_item:
            out_item["e"] = in_item["e"]
        for language in languages:
            if language != def_lang:
                lObj = languages[language]
                out_item["t"][language] = lObj[n_key]["t"] if n_key in lObj and "t" in lObj[n_key] else out_item["t"][def_lang]
                out_item["h"][language] = lObj[n_key]["h"] if n_key in lObj and "h" in lObj[n_key] else out_item["h"][def_lang]
        #if not strftime("%Y-%m-%d") > out_item.get("e", "9999-99-99"): # skip any expired news and introduce a new millenium bug
        out.append(out_item)
    if args.pretty:
        print "newsdata(%s)" % (json.dumps(out, sort_keys=True, indent=4, separators=(',', ': ')))
    else:
        print "newsdata(%s)" % (json.dumps(out, separators=(',', ':'))) # minified