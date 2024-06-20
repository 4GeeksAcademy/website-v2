# How to add a call to action on the academy blog articles

Use the following code to include in between paragraphs a call to action to a particular website landing page.

```
<call-to-action button_text="Ver programa" button_link="/es/coding-bootcamps/desarrollador-full-stack" background="rgb(0, 151, 205)" title="Impulsa tu carrera, gracias a la programación" text="Te invitamos a impulsa tu carrera, aprendiendo a programar con nuestro Programa Full Stack Developer."></call-to-action>
```

AS you can see, you need to specify carefully the following properties:

| Property              | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| button_text           | The label of the button, for example "Ver programa"                           |
| button_link           | The relative (or absolute) URL we are taking the readers to                   |
| background            | RGB color [you can pick from here](https://htmlcolors.com/google-color-picker)|
| title                 | Short motivation to the user, what clicking on the button?                    |
| text                  | Elaborate more on the incentives for the user to click on the box.            |

## Example

- This is an article with a CTA box in it: [4Geeks Academy llega a Venezuela](https://4geeksacademy.com/es/tendencias-y-tecnologia/4geeks-academy-llega-a-venezuela)
- This is [the article markdown](https://github.com/4GeeksAcademy/website-v2/blob/master/src/data/blog/4geeks-academy-llega-a-venezuela.es.md).

## This is how the CTA box would look like:

<img width="1416" alt="Screen Shot 2022-08-17 at 3 48 03 PM" src="https://user-images.githubusercontent.com/426452/185229419-a6e85996-e5d9-4ac7-a689-a77074265dca.png">
