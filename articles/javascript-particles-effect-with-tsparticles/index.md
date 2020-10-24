You might have come across a website with a background effect that slightly looks like these examples.

[Example1:](https://codepen.io/matteobruni/pen/OJVZvPP)

![image title](\example1.gif)

[Example2:](https://codepen.io/matteobruni/pen/BaNwOzB)

![image title](\example2.gif)

[Tsparticles](https://github.com/matteobruni/tsparticles) is one of the JavaScript libraries that will help achieve this. Tsparticles is a lightweight animation library. As the name sounds, the library enables you move some tiny particles on your web background, with many fancy features. [Particle.js](https://vincentgarreau.com/particles.js/), though, have not been lately updated and got bugs not fixed. Due to this, a hybrid typescript library tsparticles, was introduced to improve the paricle.js bugs and maintenance. It supports some common [JavaScript frameworks](https://particles.matteobruni.it/) such as Angular, Vue, React, Vanilla, svelte, and jQerry.

Tsparticles is a perfect background animation library with diverse ways to move fancy particles that fit your website layout. It is flexibly made to fit any background that matches to your outlined website.

In this guide, we will show you how to create a particle animation background effect that you can apply to a website using standard JavaScript.

### Installation and Usage

#### Using CDN
Tsparticles support CDN hosting to load particles. With CDN, include scrip tags and CDN `src`, as shown below.

```js
<script src= "https://cdnjs.cloudflare.com/ajax/libs/tsparticles/1.18.5/tsparticles.min.js"> </script>
```

Head out to [tsparticles CDN](https://cdnjs.com/libraries/tsparticles) and check the latest CDN version to take advantage of updated features.

#### Using NPM
If you are a Node.js user and love using `require()` and `import{}` in your project, tsparticles is available in the [npm registry](https://www.npmjs.com/package/tsparticles).
Run `npm install tsparticles` and use `require()` in `.js` files.

```js
const tsParticles = require("tsparticles")
```

```js
import { tsParticles } from "tsparticles"
```

#### JavaScript Frameworks
And if you love working with a JavaScript frameworks such as React Vue, Agular and jQuery, head out [here](https://particles.matteobruni.it/) and choose a framework of your choice to integrate with tsparticles.

### File Setup
Create three files, namely `index.html` `app.css` and `app.js`.

On your `index.html` file, add tsparticles `div` DOM. Add CDN, and import `app.css` and `app.js` from your root project directory.

#### `index.html`

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
<title>tsparticles </title>
    <!-- Import app.css from root directory -->
    <link rel="stylesheet" href="./app.css"/>
</head>
<body>
   <!-- tsparticles div dom -->
    <div id="tsparticles"></div>
   <!-- Import cdn -->
    <script src= "https://cdnjs.cloudflare.com/ajax/libs/tsparticles/1.18.5/tsparticles.min.js"></script>

    <!-- Import app.js from root directory -->
    <script src="/app.js">
    </script>
</body>
</html>
```

#### `app.css`
Will hold tsparticles stylesheet configurations.

```css
#tsparticles {
    /*   background; */
    width: 100%;
    background-color: #0ab1e9;
    height: 100%;
}
```

CSS properties vary depending on your website. I.e, a background that fits your web colors. And the position you want the tsparticles to be placed.

That all for `app.css` and `index.html`.

### Adding particles
The aspect properties of the particles are specified on the `.js` file. This is where you manipulate and play with particles until you get desirable particle movements. Specify `tsparticles`, the `div` element we defined in the `index.html` file.

```js
/* tsParticles.load("tsparticles", {
.load(@dom-id, @path-json, @callback (optional)); */
tsParticles.load("tsparticles", {}
```

First, specify the number of particles to move on you background canvax.

```js
/* tsParticles.load("tsparticles", {
.load(@dom-id, @path-json, @callback (optional)); */
tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 200
    },
  }
})
```

Define the number of particles to show with parameter value and pass a number to it. I choose to use 400; it depends a lot on the kind of movement you want to build. Load the `index.html` and 400 particles will float on your canvas. The number may vary as you practice and create more background. Sometimes the number can be small depending on the particle size, collisions, linking, and interactivity. We shall look at that in detail as we play with tsparticles.

***Note:*** if you open the `index.html` page directly on the browser. I.e;

![image title](\local-file-browser.png)

No particles will be loaded. To avoid such circumstances, use the live-server provided on your text editor to open the `index.html` files.

![image title](\server-browser.png)

For example:
- [Visual studio code](https://code.visualstudio.com/) - install [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
- [Atom](https://atom.io/) - install [atom live server](https://discuss.atom.io/t/how-to-install-configure-atom-live-server/53651/8).

### Adding Motion
The created particle are motionless. Right below `number:` property add.

```js
move: {
      enable: true
    },
```

Enable motion to `true`. Save the file. Live server will reload the page, and you'll have the particles moving around.

### Playing with Colors
Tsparticles load these particles with the default color set. There are several ways to play with the particle color values.

#### Single Color
All particles will have one uniform color.

```js
color: {
    value: "#ff0000"
},
```

#### Multiple Colors
Particles can have different colors, the color value takes an array of colors. For example, passing two colors black and white. Two colors mean if the first particle is black, the next nearest particle will take the alternating color white.

```js
color: {
value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
},
```

##### Random Colors
Passing a random value, tsparticles will give the particles randomized colors. Almost every particle will have a different color.

```js
color: {
    value: "random ",
},
```

Add animation to animate and transit tsParticles color with a beautiful transforming colored particles. Specify the speed that a particle jump from color a to color b. Adding animation to a single color will randomized particles colors.

```js
color: {
      value: "#ff0000",
      animation: {
        enable: true,
        speed: 40,
        sync: true
      }
},
```

### Shaping the Particles
Particles loads on the default circular shape. The common shapes include:

```
"circle"
"edge"
"triangle"
"polygon"
"star"
```

Specified with:

```js
shape: {
    type: "circle",
},
```

Go ahead and try these shapes. Specify the `nb_value` for polygon-shaped particles. Ie:

```js
polygon: {
    nb_sides: 5
```

Just like colors, add an array of shapes to have multiple shaped particles.

```js
type: ["circle", "star", "edge"],
```

Or try a default image.

Tsparticles allows you to choose an image or array of images as a particle. For example, if I wanted my particle to be bubbles, I will link an image with bubbles. In this case I passed and array of images.

```js
shape: {
    type: "image",
      image: [{
          src: "https://cdn130.picsart.com/262323691001212.png?r1024x1024",
          width: 202,
          height: 200},{
          src: "http://pngimg.com/uploads/soap_bubbles/soap_bubbles_PNG72.png",
          width: 1153,
          height: 1080},{
          src:
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/54e847be-8444-4485-9d2f-0d51a9ab6b3f/dcruv7h-9c57c565-e380-4d20-9413-d743c35c83a4.png/v1/fill/w_894,h_894,strp/transparent_rainbow_bubble_prop_png_3_by_lxc808_dcruv7h-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzU0ZTg0N2JlLTg0NDQtNDQ4NS05ZDJmLTBkNTFhOWFiNmIzZlwvZGNydXY3aC05YzU3YzU2NS1lMzgwLTRkMjAtOTQxMy1kNzQzYzM1YzgzYTQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.laWMbla12KsLhf1aJHcWGzVyHxfciBK84P_uzOZSKTs",
          width: 894,
          height: 894
        }
      ]
},
```

Remember, image will only work if you specify the shape property  as `type: "image"`.

### Particle Size
Modify the shape size.

```js
size: {
      value: 10,
      random: true,
      anim: {
        enable: true,
        speed: 20,
        size_min: 0.1,
        sync: false
    }
},
```

You might set random to `true` to create particles of different sizes ranging from mini of 0.1 to 10. Add animation property to animate the particles as the size changes.

You now have an essential background with fancy colors, animated sizes, and shapes.

To this point, the `app.js` should look close to this code sample.

```js
tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 400
    },
    color: {
      value: "#344455",
      animation: {
        enable: true,
        speed: 40,
        sync: false
      }
    },
    shape: {
      type: "circle",
      },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: true,
        speed: 20,
        size_min: 0.1,
        sync: false
      }
    },
    move: {
      enable: true,
    },
  }});
```

If you serve `index.html`, you should be having a background close to the samples below.

#### Using circular shapes with randomized colors
![image title](\circular-randomized-colors.gif)

#### Using bubbled array images as the shape
![image title](\bubbled-image.gif)

### Particle Linking
The next big thing is to link a particle to the nearest neighboring particles to create a connection between the particle movement. When `line_linked:` enabled to true, every particle will be connected to the most relative adjacent particle. The linking line takes additional values such as distance. Distance specifies the range at which a particle should link to another particle. Customize the link by passing color, opacity, and width parameters.

```js
line_linked: {
      enable: true,
      distance: 100,
      color: "#fff",
      opacity: 0.4,
      width: 1
},
```

![image title](\linked-particles.gif)

### Interactivity
I want to add the particles' interactivity with the screen movements, such as onclick and onhover events. This tells the particle what to do whenever onscreen interaction is detected. Each event takes a parameter mode that defines how the particles will behave on event detection. Modes specifies the behaviors of the event.

They include:
- Push­ - add more particles. Specified with `particles_nb` (the number of particles to add).
- Bubble - expand particles on a specified range.
- Remove - delete or remove particles on onclick. Specified with `particles_nb` (the number of particles to remove).
- Repulse - pushes particles away to a radius.
- Grab - connect the nearest particle in a specified radius. Only applicable with onhover.

```js
interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
     onclick: {
        enable: true,
        mode: "bubble"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8
      },
      repulse: {
        distance: 200
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
```

### Final Output

```js
tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 400
    },
      color: {
      value: "random",
      animation: {
        enable: true,
        speed: 40,
        sync: false
      }
    },
      shape: {
      type: "circle",
      },
      size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 16,
        size_min: 0.1,
        sync: false
      }
    },
      line_linked: {
      enable: true,
      distance: 100,
      color: "random",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
    },
  },
 interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "bubble"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8
      },
      repulse: {
        distance: 200
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true,
});
```

![image title](\linked-particles.gif)

### Application Example
The end product is to be able to apply the particle background on your website. The example below shows a login form floating  over a particle's background.

#### Files Setup:

##### `App.css`

```css
html {
    height: 100%;
    overflow: hidden;
}
body {
    background: #f2f2f2;
    font-family: "Varela", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    height: calc(100%);
    overflow: auto;
    position: relative;
}
label {
    margin-top: 6px;
    line-height: 17px;
}
a {
    color: #fff;
}
a:focus,
a:hover {
    color: #008080;
}
.checkbox-inline+.checkbox-inline,
.radio-inline+.radio-inline {
    margin-top: 6px;
}
/******* Login Page *******/
body.login {
    background: rgb(205, 206, 140);
    background: -moz-radial-gradient(center,
            ellipse cover,
            rgba(255, 255, 255, 1) 0%,
            rgba(19, 80, 88, 1) 100%);
    background: -webkit-gradient(radial,
            center center,
            0px,
            center center,
            100%,
            color-stop(0%, rgba(255, 255, 255, 1)),
            color-stop(100%, rgb(9, 54, 59)));
    background: -webkit-radial-gradient(center,
            ellipse cover,
            rgba(255, 255, 255, 1) 0%,
            rgba(19, 80, 88, 1) 100%);
    background: -o-radial-gradient(center,
            ellipse cover,
            rgba(255, 255, 255, 1) 0%,
            rgba(19, 80, 88, 1) 100%);
    background: -ms-radial-gradient(center,
            ellipse cover,
            rgba(255, 255, 255, 1) 0%,
            rgba(19, 80, 88, 1) 100%);
    background: radial-gradient(ellipse at center,
            rgba(255, 255, 255, 1) 0%,
            rgba(19, 80, 88, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#f1f2b5', endColorstr='#135058', GradientType=1);
}
.relative {
    position: relative;
}
.login-container-wrapper .logo,
.login-container-wrapper .welcome {
    margin: 0 0 20px 0;
    font-size: 16px;
    color: #fff;
    text-align: center;
    letter-spacing: 1px;
}
.login-container-wrapper .logo {
    text-align: center;
    position: absolute;
    top: -42px;
    margin: 0 auto;
    width: 25%;
    left: 37.5%;
    border-radius: 50%;
    background-color: #344455;
    padding: 25px;
    box-shadow: 0px 0px 9px 2px #344454;
}
.login-container-wrapper {
    max-width: 400px;
    margin: 10% auto 8%;
    padding: 40px;
    box-sizing: border-box;
    background: rgba(57, 89, 116, 0.8);
    box-shadow: 1px 1px 10px 1px #000000, 8px 8px 0px 0px #344454,
        12px 12px 10px 0px #000000;
    position: relative;
    padding-top: 80px;
}
.logo .fa {
    font-size: 50px;
}
.login input:focus+.fa {
    color: #fff;
}
.login-form .form-group {
    margin-right: 0;
    margin-left: 0;
}
.login-form i {
    position: absolute;
    top: 18px;
    right: 20px;
    color: #93a5ab;
}
.login-form .input-lg {
    font-size: 16px;
    height: 52px;
    padding: 10px 25px;
    border-radius: 0;
}
.login input[type="email"],
.login input[type="password"],
.login input:focus {
    background-color: rgba(40, 52, 67, 0.75);
    border: 1px solid #4a525f;
    color: #eee;
    border-left: 4px solid #93a5ab;
}
.login input:focus {
    border-left: 4px solid #ccd8da;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    background-color: rgba(40, 52, 67, 0.75) !important;
    background-image: none;
    color: rgb(0, 0, 0);
    border-color: #faffbd;
}
.login .checkbox label,
.login .checkbox a {
    color: #ddd;
}
#tsparticles {
    /*   background: cornflowerblue; */
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
}
```

##### `Index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>tsparticles</title>
    <!-- Import app.css from root directory -->
    <link rel="stylesheet" href="./app.css" />
     <!-- Import Varela font-->
 <link rel="stylesheet"href="https://fonts.googleapis.com/css?family=Varela">
  <!-- Import font-awesome -->
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- Import icons -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css">
</head>
<body>
    <!-- tsparticles div -->
    <div id="tsparticles"></div>
<body class="login">
  <div class="container">
    <div class="login-container-wrapper clearfix">
      <div class="logo">
        <i class="fa fa-sign-in"></i>
      </div>
      <div class="welcome"><strong>Welcome,</strong> please login</div>
      <form class="form-horizontal login-form">
        <div class="form-group relative">
          <input id="login_username" class="form-control input-lg" type="email" placeholder="Username" required>
          <i class="fa fa-user"></i>
        </div>
        <div class="form-group relative password">
          <input id="login_password" class="form-control input-lg" type="password" placeholder="Password" required>
          <i class="fa fa-lock"></i>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success btn-lg btn-block">Login</button>
        </div>
        <div class="checkbox pull-left">
          <label><input type="checkbox"> Remember</label>
        </div>
        <div class="checkbox pull-right">
          <label> <a class="forget" href="" title="forget">Forgot your password</a> </label>
        </div>
      </form>
   </div>
  </div>
    <!-- Import tsparticles.js and app.js files -->
    <script src= "https://cdnjs.cloudflare.com/ajax/libs/tsparticles/1.18.5/tsparticles.min.js"> </script>
    <script src="/app.js">
    </script>
</body>
</html>
```

##### `App.js`

```js
tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 100
    },
      color: {
      value: "random",
      animation: {
        enable: true,
        speed: 50,
        sync: false
      }
    },
      shape: {
      type: "circle",
      },
      size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 16,
        size_min: 0.1,
        sync: false
      }
    },
      line_linked: {
      enable: true,
      distance: 100,
      color: "random",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
    },
  },
 interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "bubble"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8
      },
      repulse: {
        distance: 200
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true,
});
```

##### Output
![image title](\form.gif)

[***Sample source***](https://codepen.io/matteobruni/pen/xxGXELa)

### Final Notes
Tsparticle is a cool library that you should give a try in your next JavaScript project. It provides you fancy backgrounds that will make your user enjoy interacting with your web apps. We have covered simple grounds. Consider looking at [tsparticles codepen](https://codepen.io/matteobruni/pens/popular) sample examples and their [official docs](https://particles.matteobruni.it/docs/). This will give more examples to interact with as you try to manipulate and play with tsparticles values. Remember to check out how to use tsparticle with your favorite [Javascript framework](https://tsparticles.matteobruni.it/).

Tspartcle borrows its concept from [Particle.js](https://github.com/VincentGarreau/particles.js/). If you had previously done a project with Particle.js, check out [how to migrate to tsparticle](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m) and enjoy more updated features. If you enjoy building WordPress websites, this [article](https://www.elementoraddons.com/tutorial/add-particles-background-to-sections-in-elementor-page-builder/) will help you add tsapatcles to your WordPress blogs.