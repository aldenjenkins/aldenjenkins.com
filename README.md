#  About

Blog Theme: Balzac [check out the repo](http://jekyll.gtat.me)
[Preview the theme live](http://jekyll.gtat.me/)
---

![Balzac for Jekyll](http://cl.ly/Qdzo/Screen%20Shot%202013-08-05%20at%205.35.11%20PM.jpg)
---
![Balzac for Jekyll](http://cl.ly/Qdyh/Screen%20Shot%202013-08-05%20at%205.30.01%20PM.jpg)

## Features:
- fully static blog and portfolio
- flexible, uses max-width for responsive goodness
- responsive drop down menu
- retina images using @2x
- post loop in the footer showing 3 latest posts
- custom portfolio page

## Basic Setup

1. [Install Jekyll](http://jekyllrb.com) if you haven't already.
2. `git clone https://github.com/aldenjenkins/aldenjenkins.com.git && cd aldenjenkins.com`
3. `bundle install`
4. Configure \_config.yml  so it's just for you. Be sure to make sure the base_url is blank so ruby recognizes localhost
5. `bundle exec jekyll serve`

``` bash
aldenjenkins.com/
├── _includes
|    ├── footer.html  //site footer
|    ├── head.html  //site head
|    ├── head-dark.html  //dark site head for light pages
├── _layouts
|    ├── home.html  //homepage layout
|    ├── page.html  //page layout
|    ├── post-index.html  //post listing layout
|    └── post.html  //post layout
|    ├── post-no-feature.html  //feature image-less post layout
├── _posts
├── assets
|    ├── css  //preprocessed less styles. good idea to minify
|    ├── img  //images and graphics used in css and js
|    ├── js
|    |   ├── main.js  //jQuery plugins and settings
|    |   └── vendor  //all 3rd party scripts
|    └── sass 
├── images  //images for posts and pages
├── about.md  //about page
├── articles.md  //lists all posts from latest to oldest
└── index.md  //homepage
```

# Customization

## _config.yml

Most of the variables found here are used in the .html files found in `_includes` if you need to add or remove anything. A good place to start would be to change the title, tagline, description, and url of your site. When working locally comment out `url` or else you will get a bunch of broken links because they are absolute and prefixed with `{{ site.url }}` in the various `_includes` and `_layouts`. Just remember to uncomment `url` when building for deployment or pushing to **gh-pages**...

### Owner/Author Information

Change your name, bio, Twitter url, email, Disqus (aka bloat and spyware) URL, etc.

### Top Navigation Links

Edit page/post titles and URLs to include in the site's navigation. For external links add `external: true`.

``` yaml
# sample top navigation links
links:
  - title: About Page
    url: /about
  - title: Other Page
    url: /other-page
  - title: External Page
    url: https://aldenjenkins.com
    external: true
```

## Other Stuff

The rest is just your average Jekyll config settings. Nothing too crazy here...

### _includes

For the most part you can leave these as is since the author/owner details are pulled from `_config.yml`. That said you'll probably want to customize the copyright stuff in `footer.html` to your liking.

### Adding Posts and Pages

There are two main content layouts: `post.html` (for posts) and `page.html` (for pages). Both have large **feature images** that span the full-width of the screen, and both are meant for text heavy blog posts (or articles). 

### Feature Images

A good rule of thumb is to keep feature images nice and wide so you don't push the body text too far down. An image cropped around around 1024 x 256 pixels will keep file size down with an acceptable resolution for most devices. 

``` yaml
image:
# local image 
  feature: feature-image-filename.jpg
# link image
  feature: "http(s)://image.domain.com/feature-image-filename.jpg"
```

This makes the assumption that the feature image is in the *images* folder unless it has a link address. To add a feature image to a post or page just include the filename in the front matter like so.
You can "serve" images responsively with retina.js. All you need to do is have a file with @2x before the file type. That should be placed in the *images* folder. You literally don't have to do anything other than that. 2 copies. One is linked. That's it.
Ex:
`cool-photo@2x.jpg` 

**There is a default feature image that will show up for and posts. It isn't retina or anything. It's just there in case you want one but forget <3*

#### If you don't want a feature image
…just say so in the front-matter. Go to your-post-name.md and make sure it has this guy up top.
```
layout: post-no-feature
```

### Categories

In the sample `_posts` folder you may have noticed `category: articles` in the front matter. I like keeping all posts grouped in the same folder. If you decide to rename or add categories you will need to modify the permalink in `articles.md` along with the filename (if renaming).

For example. Say you want to group all your posts under `blog/` instead of `articles/`. In your post add `category: blog` to the front matter, rename or duplicate `articles.md` to `blog.md` and change the permalink in that file to `permalink: /blog/index.html`.

If done correctly `/blog` should be a page listing all the site's posts.


## License

This is free to use, fork, do whatever you want. Please *do not* sell this design though because it is not mine. 
