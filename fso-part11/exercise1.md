## Prompt

Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below:

-   Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by Google.
-   What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask Google!
-   Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

## Answer

For this exercise, I will consider an app made in Python.

Linters:

-   Pylint - fast, good documentation, configurable, stats/reports
-   Flake8 - good for beginners, plugins, analysis
-   Ruff - very fast, caching, autofix, reimplementations of Flake8 plugins

If the app is not very big, I would consider Flake8. Otherwise, I would choose Ruff, due to its speed.

Testing:

-   Robot - acceptance testing & test driven development, keyword driven syntax (can be used by non-technical users)
-   PyTest - functional & API testing, plugins, tests in parallel

Unless some of the project members are non-technical users, I would choose PyTest, as it seems to be a reliable tool and it's been a top pick for a long time.

Building:

> Considering Python doesn't need a dedicated building library, I will just consider some tools with a similar purpose that are commonly used

-   pip - package manager
-   setuptools - packaging projects
-   distutils - packaging and distribution, used by setuptools

Other CI/CD options:

-   CircleCi
-   GitLab
-   Semaphore
-   TeamCity
-   Azure

Based on the info provided in the prompt, we may assume this is likely a medium sized project, in which case, a cloud-based environment would be the better option for a CI/CD setup. However, given more information regarding the size of the project, and regarding potential needs for GPU based tests, we could instead consider the self-hosting route. Some more factors worth considering are:

-   self-hosting requires more resources in terms of infrastructure and maintenance
-   self-hosting offers more customisation
-   cloud options are generally easier to adapt as the needs of the project change
-   cloud options provide their own security measures
