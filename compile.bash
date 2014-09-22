#
# Compiles markdown news from the /karp, /korp and /general directories into a combined
# jsonp file in the directory json/ with Swedish as base language. (The news will be fetched for other
# languages if available, but will resort to Swedish if not.)
# News in /general will be used for both Korp and Karp.
#
# The source files:
# - should be named "*.txt" where * is a language code
# - should contain markdowned text
# - each news item starts with an XML comment which works both as separator and descriptor.
# It should have the form (without brackets):
#   <!-- {title of the news item} {ISO-date}[extra identifier (one letter a-z)] [expiration date (ISO-format)]-->
# Examples:
#   <!-- We've added a new cool feature 2014-10-10 -->
#   <!-- We've added a nice feature 2014-10-10a -->
#    The extra letter should be used to distinguish between news items if there are more than one for the same date.
#    This is important to be able to join the different language files correctly.
#    NB: Don't combine "2014-10-10" and "2014-10-10a" but instead use "2014-10-10a" and "2014-10-10b" if there are
#    two news items the same day.
#   <!-- Our servers will be down for maintenance during X-mas 2014-12-18 2014-12-26 -->
#
# NOTES:
# --pretty can be removed to save bandwidth
# The number 100 is the maximum number of news items that can be incomporated in the json-files.
#
# DON'T FORGET TO COMMIT ALL FILES!

python skript/compile.py karp sv 100 --pretty --secondary general > json/karpnews.json
python skript/compile.py korp sv 100 --pretty --secondary general > json/korpnews.json