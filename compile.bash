svn up json/
perl skript/Markdown.pl --html4tags karpnews_se.txt > html/se.htm
#perl skript/Markdown.pl --html4tags korpnews_en.txt > html/en.htm
python skript/compile.py html se 100 --pretty > json/karpnews.json
svn commit -m "updated news" json/