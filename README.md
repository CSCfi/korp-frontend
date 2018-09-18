This repository contains a fork of the frontend for [Korp](https://korp.csc.fi), a frontend for the [IMS Open Corpus Workbench](http://cwb.sourceforge.net/) (CWB). The Korp frontend is a great tool for searching and visualising natural-language corpus data.

Korp is developed by [Språkbanken](https://spraakbanken.gu.se) at the University of Gothenburg, Sweden. 

This fork contains modifications of [Korp](https://korp.csc.fi) as used in [Kielipankki, the Language Bank of Finland](https://www.kielipankki.fi/language-bank/). Språkbanken’s Korp is accessible at [https://spraakbanken.gu.se/korp](https://spraakbanken.gu.se/korp). Please fork the original [Språkbanken’s korp-frontend GitHub repository](https://github.com/spraakbanken/korp-frontend/) instead of this one in the first place.

Please note that this fork of Korp also requires the [Korp backend as modified for Kielipankki](https://github.com/CSCfi/Kielipankki-korp-backend/). (That private repository will eventually be replaced by a fork of [Språkbanken’s Korp backend repository](https://github.com/spraakbanken/korp-backend/).)

Branches in this repository:

- `master`: The master branch for Kielipankki’s Korp.
- `beta`: The branch for the beta (development) version of Kielipankki’s Korp.
- `maint`: The previous (maintenance) version of  Kielipankki’s Korp.
- `news/master`: An independent branch containing Korp news.
- `sb/master`: A branch following the `master` branch of Språkbanken’s Korp.
- `sb/dev`: A branch following the `dev` branch of Språkbanken’s Korp.

Other public branches contain corpus- or person-specific changes to corpus configurations, eventually to be merged to `master` or `beta`.

Documentation at Kielipankki, primarily aimed at people importing corpora to Kielipankki’s Korp:

- [Main page](https://www.kielipankki.fi/development/korp/)
- [Korp frontend corpus configuration](https://www.kielipankki.fi/development/korp/corpus-config/)

Documentation at Språkbanken:

- [Frontend documentation](https://spraakbanken.gu.se/eng/research/infrastructure/korp/distribution/frontend)
- [Backend documentation](https://spraakbanken.gu.se/eng/research/infrastructure/korp/distribution/backend)
- The pipeline used to tag and otherwise process raw Swedish-language corpus data is documented [here](https://spraakbanken.gu.se/eng/research/infrastructure/korp/distribution/corpuspipeline)

Local setup for Ubuntu:

    sudo apt-get install npm
    sudo npm install -g grunt-cli
    sudo apt-get install nodejs
    npm install
    sudo ln -s /usr/bin/nodejs /usr/bin/node
    sudo apt-get install ruby-dev
    sudo gem install compass
    grunt serve
