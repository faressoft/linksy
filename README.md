# Linksy

[![npm](https://img.shields.io/npm/v/linksy.svg)](https://www.npmjs.com/package/linksy)
[![npm](https://img.shields.io/npm/l/linksy.svg)](https://github.com/faressoft/linksy/blob/main/LICENSE)

> CLI tool for quickly accessing your links and nested bookmarks with fuzzy search

**It opens the selected link in your default browser.**

<p align="center">
  <a href="https://www.terminalizer.com/view/c867d33c5962" target="_blank">
    <img src="/demo/demo.gif?raw=true"/>
  </a>
</p>

The image ☝️ made by my [Terminalizer](https://github.com/faressoft/terminalizer). Check the [Demo](https://www.terminalizer.com/view/c867d33c5962) in a web player

---

Here are some usage examples:

- Open Datadog **dashboards**, **logs**, **metrics** and OpsGenie alerts quickly.
- Switch between DEV and PROD environments easily.
- Open to Miro boards, **roadmaps**, diagrams, **swimlanes** and planning tools fast.
- Open **docs** like Confluence and Swagger instantly.
- Open baseURLs for your service in different environments.
- Open **Sentry**, NewRelic, and other monitoring tools quickly.
- Open Figma, Sketch, and other design tools fast.
- Check service health and uptime dashboards.
- Open **JIRA** boards, **tickets**, and **backlogs** quickly.
- Access HR tools, **payroll**, and **benefits** quickly.

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

# Installation

```bash
npm install linksy -g
# or using yarn
yarn global add linksy
```

# Usage

```bash
links
links --config # to show the config file path and open it
links --help # to show the help
```

You can also pass an argument to open the first matching link directly

```bash
links jira
```

You can also use the alias command `linksy` instead of `links`

```bash
linksy
```

# Configuration

Syntax:

```yaml
LinkName: 'URL'
AnotherLinkName: 'URL'
NestedLinks:
  LinkName: 'URL'
  AnotherLinkName: 'URL'
  NestedLinks:
    LinkName: 'URL'
    AnotherLinkName: 'URL'
```

Here is a sample:

> This is just a template, feel free to remove everything and add your own links

```yaml
Jira: 'https://example.atlassian.net/jira/software/projects/EXA/boards/000'
MyPRs: 'https://github.com/creditornot/service-services/pulls/faressoft'
DemoApp: 'https://service.development.dev.example.com/login'
PagerDuty: 'https://example.pagerduty.com/schedules'
Roadmap: 'https://example.atlassian.net/wiki/spaces/CO/pages/000000/Roadmap'
SSO Okta: 'https://doordash.okta.com/'
Sentry: 'https://example.sentry.io/issues/searches/99999/?groupStatsPeriod=auto&project=00000'

MiroBoards:
  Retro: 'https://miro.com/app/board/00000=/'
  Roadmap: 'https://miro.com/app/board/00000=/'
  SystemDesign: 'https://miro.com/app/board/00000=/'

Swarmina:
  Signup Flow: 'https://swimlanes.io/#00000'
  Login Flow: 'https://swimlanes.io/#00000'

AWS:
  dev: 'https://company-prod.aws.amazon.com/console'
  prod: 'https://company-prod.aws.amazon.com/console'

RFCs:
  RFC 01: 'https://company.atlassian.net/wiki/spaces/CO/pages/00000/rfc01'
  RFC 02: 'https://company.atlassian.net/wiki/spaces/CO/pages/00000/rfc02'

App:
  DEV:
    MobileAPI: 'https://mobile.dev.example.com'
    DesktopAPI: 'https://desktop.dev.example.com'
  PROD:
    MobileAPI: 'https://mobile.example.com'
    DesktopAPI: 'https://desktop.example.com'

Docs:
  confluence: 'http://confluence.example.com'
  swaggerDocs: 'https://mobile.dev.example.com/docs'

Jenkins: 'https://jenkins.example.com/'

OpsTools:
  Prod: 'https://opstools.example.com'
  Dev: 'https://opstools.dev.example.com'

# Links can be nested as much as you want
Datadog:
  Monitors:
    APIs: 'https://example-prod.datadoghq.eu/dashboards/000000/service-apis'
    Mongo: 'https://example-prod.datadoghq.eu/dashboard/000000/service-mongo'
    Redis: 'https://example-prod.datadoghq.eu/dashboard/000000/service-redis'
    S3: 'https://example-prod.datadoghq.eu/dashboard/000000/service-s3'
  APM:
    AuthApp Prod: 'https://example-prod.datadoghq.eu/services'
    AuthApp Dev: 'https://example-dev.datadoghq.eu/apm/services'
  Logs:
    AuthApp Prod Filter Endpoint: 'https://example-prod.datadoghq.eu/logs?query='
    AuthApp Prod: 'https://example-prod.datadoghq.eu/logs?query='
    AuthApp Dev: 'https://example-dev.datadoghq.eu/logs?query='

# Write keywords if you feel that you might not remember the key
Self-Service / Service Catalog / FreshDesk FreshService / Requests / Support:
  Service Catalog: 'https://example.freshservice.com/helpdesk/home'
  Freshservice Tickets: 'https://example.freshservice.com/helpdesk/'
```

# License

This project is under the MIT license.
