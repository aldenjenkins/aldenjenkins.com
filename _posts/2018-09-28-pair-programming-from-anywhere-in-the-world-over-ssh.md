---
title: 'Pair Programming from Anywhere on Earth over SSH'
date: 2018-12-10
author: Alden
layout: post
permalink: /blog/pair-programming/
categories:
  - Technology
tags:
  - ssh, tmux, programming
comments: true
readTime: '12 min'
---

Let's admit it: _We all hate pair programming_, but we have to admit it is effective. 
In pair programming, we are always exposing ourselves to new methods of programming
and are given the opportunity to challenge our own ideas to bring the best solutions
to fruition.  The fact of the matter is that Pair programming always helps atleast one of the parties involved by 
teaching one in the pair something or providing a new perspective for the most efficient means
to complete a task.

## The Issue
Now most of the time we like the person we're working with, or can atleast tolerate them in person.
But in some cases, they are impossible to be around in person! If you're experiencing the latter (or just
prefer to pair program remotely -- a much more realistic scenario which also comes with plenty of 
inherent convenience,) then this tutorial is for you.

## Solutions
There are a couple types of solutions which allow for being able to pair program remotely.

### Facetime (or other video/screen sharing solution):
 
 Perhaps the most archaic solution, coding over video chat often leaves one person doing most of the work
 and the other person squinting at where the other person's cursor is. This is the solution most conducive to YATS
 (Yelling At The Screen) when you're trying to get your partners attention as they're scrolling through a file and you
 see the piece of code you were scanning for.

### Code Sharing websites like Google Docs
While Facetime solutions succeeds in the personal connection aspect, they fail in being able to allow for easy
contribution to the code from either party in the partnership. If you wanted to change the code over voice call,
you would need to tell your partner what to change exactly.


## The Best of both worlds

Where Code sharing websites succeed, Video sharing solutions fail, and vice versa. You can't both code at the same time while also being able to see and talk to each
other at the same time. The following allows for the best of both worlds, from anywhere in the world.

### Using Tmux over SSH combined with Appear.in
The SSH protocol allows for secure access to your code base from anywhere in the world. Think of it like traveling to your house in an armored car in layman terms.
Your data could still be stolen, but it would be insurmountably more difficult to do as opposed to if you were using an insecure transport method (im looking at you Telnet!)

Once you've SSH'd into your server, the [Tmux](https://www.systutorials.com/docs/linux/man/1-tmux/) application allows a vast expanse of applicable usages besides pair programming.

It can be used as:
* A more feature-filled replacement for the popular __Nohup__ alternative __Screen__
* A Terminal screen multiplexer (points to the the name TMUX)
* A Pair Programming solution.

Tmux runs a local server which runs any number of terminals that you like. The key here is that the local server can be attached to and disconnected from.

### See it in action!
<figure>
<script src="https://asciinema.org/a/7JD45Xi4Zs4dR9oLxn2iWjODg.js" id="asciicast-7JD45Xi4Zs4dR9oLxn2iWjODg" async></script>
   <figcaption>Me attaching and detatching from one of my two live Tmux sessions at will.</figcaption>
</figure>

The issue here is that to be able to connect to User1's Tmux session, you must also be logged in as User1.

While most people who pair program together have no problem extending the trust needed to share their password to one another,
some people don't like that level of commitment. This is not an issue! You can use SSH keys to control who has access to your
user.

Once someone has an SSH Key to your server, they can simply login using that key in lieu of a password. To delegate someone an SSH key, have them first create a Public/Private key pair using the following:

```
ssh-keygen -t rsa -C "your_email@example.com"
```

The Password which it asks you to fill out can be ignored or filled depending on whether you feels he won't let anyone else gain
access to the key they just produced. If they're the type that's usually late for work after the night of the Powerball winner announcement, they better have a password on their key!
This password acts as the second factor of Two-factor auth because the authentication requires __something you have__ (the newly generated key) and __something you know__ (the aforementioned
password which decrypts the key)

Have the key creator give you the .pub public key which was created from the previous command output and place the contents of that key
in your `$HOME/.ssh/authorized_keys` file and then restart your SSH service by running `sudo service ssh restart`. Your SSH process is now loaded
with the understanding that anyone who connects with a private key which when [Diffie-Hellmann'd](https://security.stackexchange.com/questions/45963/diffie-hellman-key-exchange-in-plain-english)
with your public key in `authorized_keys` should result in an affirmative value should be allowed access to your user.

You can control who has access to your user based on the public keys listed in authorized keys. Want to prevent someone from logging in?
Simply remove their entry in the file.

To attach to a running Tmux session as shown above, you can run 
```
tmux a
```
if there is only one session running. Or to pick a specific session,
you can run 
```
tmux ls
# Results shown here
tmux a -t <session number picked from above results>
```

While each of you now has easy access to your compile scripts, and the rest of the codebase, and direct system terminal access, the issue of no video/audio personal connection
still exists.

[Appear.in](https://appear.in) is the perfect solution. appear.in allows for audio, video, and screen sharing communication all within the browser.
No other solution provides the same functionality while also being totally free.

Happy coding!

## Honorable Mentions

The vim plugin [CoVim](https://github.com/FredKSchott/CoVim), developed by Tufts Computer Scientists, allows for pair programming through vim sessions.
The downfall to this is that you must compile your vim from source with python support if it does not already have it, and you also only have access to
your partner's vim session _instead of their entire terminal_. This means that you do not have access to the rest
of the codebase outside of vims !command functionality, which is limiting in usability. You can read more about CoVim
[in their announcement post here](http://fredkschott.com/post/2013/05/introducing-covim-real-time-collaboration-for-vim/)!
