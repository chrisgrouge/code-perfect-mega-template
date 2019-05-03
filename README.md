# Mega-Template
This repository is intended to be used as a boilerplate for starting new emails projects. 

## Getting Started

> ### **Before you get started**:
> You need to make sure that you have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed on your machine. Whatever the latest version is should suffice.

### Open up your machines terminal

On a windows machine, powershell should do the trick

### Installing some packages globally onto your machine.

``` sh
$ npm install -g gulp-cli browser-sync

```
Installing these packages, gives you access to the `gulp` and `browser-sync` terminal commands (which you will need later). 

### Cloning the repository
``` sh
$ git clone https://github.com/h-jennings/code-perfect-mega-template.git [project-name]

```
> **Very Important Note:** Avoid cloning this repo into a OneDrive directory. This repo contains thousands of tiny files that are completely unnecessary once you're done with the development process, and **do not** need to be synced to the cloud.  

### Installing package dependencies
``` sh
$ npm install

```

>**Note:** Unless you are contributing to the repo, I would go ahead and get rid of any files related to git. **You may need to make hidden files on your machine visible to do this.**

### Starting the development/build process 

``` sh
$ gulp

```

### What's happening now?
Now that you've started the development environment by typing in that `gulp` command a few things are happening:

1. This will open your default browser and create a hot-reloading development environment (using browser-sync)
2. The gulp script is now also watching for changes in files that exist in the `src` folder
3. Any time you make a change to the `index.html` or the `styles.css` file in the `src` folder and **save**, the html is then copied, all css is automatically inlined (pulling from the `styles.css` referenced in the `index.html` document), and placed then in the `dist/build-inline` folder.
    * **Quick Note:** I would recommend only inlining styles manually on two occasions:
        1. For layout purposes (ex. `width: 50%;`)
            * I've found that since we're primarily doing table-based layouts, writing the **layout-specific** inline styles seem to be easier to read and manage.
        2. Or for stylistic purposes when it's absolutely more convenient then creating a unique class.
            * Not the best practice in the world, I know. But hey, this is email development.


## List of Available Modules
1. Full-width Hero Image
1. 3-Up with CTA
1. 2-Up with CTA
1. 4-Up with CTA
1. S-curve with CTA
1. S-curve with CTA colored
1. Main CTA
1. Main CTA Ghost
1. Headline
1. Paragraph Text Block
1. Text Block with Headline / CTA / Paragraph
1. Section Header with Divider
1. Background image with text overlay
1. Background image with text overlay block
1. Background image with text overlay block left
1. Background image with text overlay block right
1. Spacer
1. Divider
1. Text Block Colored
1. Bordered Banner with Headline and Text
1. Colored Banner
1. Colored Banner with CTA
1. Bulleted List Centered
1. Bulleted List Aligned Left
1. Bulleted List 2 Column
