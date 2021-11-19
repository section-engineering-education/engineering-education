---
layout: engineering-education
status: publish
published: true
url: /using-mldotnet-for-object-detection-in-winforms/
title: Using ML.NET for Object Detection in WinForms
description: In this article, we will look at how we can use the ML.NET framework to create a windows forms app that can detect objects in an image.
author: geoffrey-omukuba
date: 2021-11-19T00:00:00-02:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-mldotnet-for-object-detection-in-winforms/hero.jpg
    alt: Using ML.NET for Object Detection in WinForms Hero Image
---

Object detection is the ability of a program to detect objects in an image. ML lets the .NET developers implement this feature by using the ML.NET framework to create bespoke machine learning models in C# or F#.
<!--more-->
In this article, we will look at how we can use the ML.NET framework to create a windows forms app that can detect objects in an image.

### Prerequisites
To follow along, you need to have:
- Basic understanding of C#. You can learn from the [Microsoft website](https://docs.microsoft.com/en-us/dotnet/csharp/).
- Basic understanding of [.NET](https://docs.microsoft.com/en-us/dotnet/) development platform.
- Microsoft Visual Studio installed. You can download Visual Studio from [here](https://visualstudio.microsoft.com/vs/).

The first step is opening visual studio and follow the steps below:
1. Click on `Create new project`.
2. On the next screen search for `Windows Forms` and select `Windows Forms App(.NET Framework)` and select the one that is using `C#`. and click `Next`
3. Enter the name of the project you want to create i.e, `Win_Forms_ObjectDetection`, and click `create`.

![Project name](/engineering-education/using-mldotnet-for-object-detection-in-winforms/projectname.jpg)

The form designer should look at the one shown in the figure below.

![Design](/engineering-education/using-mldotnet-for-object-detection-in-winforms/appearance.jpg)

You will be required to download some nugget packages for the object detection to be effective. These packages are `Microsoft.ML`, `Microsoft.ML.OnnxRuntime`. 

Since you are dealing with object detection, you will also download `Microsoft.ML.Image.Analytics`. You will also download `Microsoft.ML.OnnxTransformer` because you are using the Microsoft object detection model.

### Selecting the right processor
You will encounter an error when you build the project, this is because `ML.NET` supports only a 64-bit processor and the settings is 32-bit processor.

To solve this error, right-click on the project name and navigate to properties, then go to build and select `x64` under `platform target`.

### Adding a button
Now on the toolbox sidebar, drag a `Button` and drop at the bottom of the form designer tab. Go to the properties side and rename it from `button1` to `Select Image`.

On the same properties sidebar, scroll down to `Name` and change the name to give it the name `imgSelectBtn`.

### Enabling the button
To make the `btnSelectImage` functional you will use the `fileSystemWatcher` and the `openFileDialog` which goes at the bottom of the window and rename it to `fileWatcher` and `fileDialog` respectively.

 A `fileSystemWatcher` watches for different changes in the system and the file directory.

 `openFileDialog` asks the user to open a file and select a file from it.
 
### Creating folders
You will also create some folders i.e, `MLmodels` and `Models` for different classes that you shall be using.

### MLModels folder
In your `MLModels` folder, you will add `lbls.txt` file that contains `red`, `blue`, `white`, and `green` colors which give the different labels that we are using and the `model.onnx` file from the custom vision.

### Models folder
You will create four classes in your `Models` folder i.e, `ImageSettings`, `ImageInputs`, `ImageResults`, and `BndBox`.

Now, double click on the button you created - a code editor named `form1.cs` will open. This is where most functions of the project are implemented to enable a click event on the button.

```C#
namespace ObjectDetection
{
    public partial class Form1 : Form
    {
        public const int lineCount = 12, pileCount = 12;
        public const int ftsPerBx = 6;
        private static readonly (float x_axis, float y_axis)[] bxAnchors = { (0.564f, 0.688f), (1.80f, 2.00f), (3.44f, 5.67f), (7.68f, 3.55f), (9.88f, 9.20f) };
        private PredictionEngine<ImageInput, ImageResults> _predictionEngine;
        public Form1()
        {
            InitializeComponent();
            picPrediction.Visible = false;
            var context = new MLContext();
            var emptyStatistics = new List<ImageInput>();
            var statistics = context.Data.LoadFromEnumerable(emptyStatistics);
            var pyplne = context.Transforms.ResizeImages(resizing: ImageResizingEstimator.ResizingKind.Fill, outputColumnName: "statistics", imgBreadth: ImageSettings.imgBreadth, imgHeit: ImageSettings.imgHeit, inputColumnName: name_of(ImageInput.img))
                            .Append(context.Transforms.ExtractPixels(outputColumnName: "Statistics"))
                            .Append(context.Transforms.ApplyOnnxModel(modelFile: "./MLModel/model.onnx", outputColumnName: "model_outputs", inputColumnName: "Statistics"));
            var mdl = pyplne.Fit(Statistics);
            _predictionEngine = context.Model.CreatePredictionEngine<ImageInput, ImageResults>(mdl);
        }
        private void imgSelectBtn_Click(object sender, EventArgs e)
        {
            if (fileDialog.ShowDialog() == DialogResult.OK)
            {
                var img = (Bitmap)Image.FromFile(fileDialog.FileName);
                var result = _predictionEngine.Predict(new ImageInput { Image = img });
                var lbls = File.ReadAllLines("./MLModel/indicators.txt");
                var bndBoxes = ParseOutputs(prediction.ImageType, lbls);
                var initialWidth = img.Width;
                var initialHeight = img.Height;
                if (bndBoxes.Count > 1)
                {
                    var maximum = bndBoxes.Max(b => b.Confidence);
                    var highBndBox = bndBoxes.FirstOrDefault(b => b.Confidence == maximum);
                    bndBoxes.Clear();
                    bndBoxes.Add(highBndBox);
                }
                else
                {
                    MsgBox.Show("No results for the image");
                    return;
                }
                foreach (var bndBox in bndBoxes)
                {
                    float x_axis = Math.Max(bndBox.Dimensions.X, 0);
                    float y_axis = Math.Max(bndBox.Dimensions.Y, 0);
                    float breadth = Math.Min(initialWidth - x, bndBox.Dimensions.Width);
                    float heit = Math.Min(initialHeight - y, bndBox.Dimensions.Height);

                    // in order to fit to the current image size
                    x_axis = initialWidth * x_axis / ImageSettings.imgWidth;
                    y_axis = initialHeight * y_axis / ImageSettings.imageHeight;
                    breadth = initialBreadth * breadth / ImageSettings.imageWidth;
                    heit = initialHeit * heit / ImageSettings.imageHeight;
                    using (var graphics = Graphics.FromImage(img))
                    {
                        graphics.DrawRectangle(new Pen(Color.Red, 3), x_axis, y_axis, breadth, heit);
                        graphics.DrawString(boundingBox.Description, new Font(FontFamily.Families[0], 30f), Brushes.Red, x + 5, y + 5);
                    }
                }
                imageResult.Image = img;
                imageResult.SizeMode = PictureBoxSizeMode.AutoSize;
                imageResult.Visible = true;
                imgSelectBtn.Visible = false;
                btnNewPrediction.Visible = true;
            }
        }
        public static List<BndBox> ParseOutputs(float[] mdlOutput, string[] lbls, float probThreshold = .5f)
        {
            var bxs = new List<BndBox>();
            for (int line = 0; line < lineCount; line++)
            {
                for (int pile = 0; pile < pileCount; pile++)
                {
                    for (int bxs= 0; bxs < boxAnchors.Length; bxs++)
                    {
                        var chnl = bxs * (lbls.Length + ftsPerBx);
                        var bndBoxResult = ExtractBndBoxResult(mdlOutput, row, column, chnl);
                        var mpdBndBox = MapBndBoxToCell(row, column, bx, bndBoxResult);
                        if (bndgBoxResult.Confidence < probThreshold)
                            continue;
                        float[] classProb = ExtractClassProbabilities(mdlOutput, row, column, chnl, bndBoxResult.Confidence, lbl);
                        var (topProb, highIndex) = classProbs.Select((prob, index) => (Score: prob, Index: index)).Max();
                        if (topProb < probThreshold)
                            continue;
                        bxs.Add(new BndBox
                        {
                            Measurements = mpdBndBox,
                            Confidence = topProb,
                            Lbl = lbls[highIndex]
                        });
                    }
                }
            }
            return bxs;
        }
        private static BndBMeasurements MapBndBoxToCell(int line, int pile, int bx, BndBoxResults bxMeasurements)
        {
            const float unitBreadth = ImageSettings.imgBreadth / pileCount;
            const float unitHeit = ImageSettings.imgHeit / lineCount;
            var mpdBx = new BndBoxMeasurements
            {
                X_axis = (line + Sigmoid(bxMeasurements.X_axis)) * unitBreadth,
                Y_axis = (pile + Sigmoid(bxMeasurements.Y_axis)) * unitHeit,
                Breadth = (float)Math.Exp(bxMeasurements.Breadth) * unitBreadth * bxAnchors[bx].x_axis,
                Heit = (float)Math.Exp(bxMeasurements.Heit) * unitHeit * bxAnchors[bx].y_axix,
            };
            // The x_axis, y_axis coordinates from the (mapped) bndbox prediction represent the center
            // of the bndbox. We adjust them here to represent the top left corner.
            mpdBox.X_axis -= mpdBox.Breadth / 2;
            mpdBox.Y_axis -= mpdBox.Heit / 2;

            return mpdBox;
        }
        private static BndBoxResults ExtractBndBoxResult(float[] mdlOutput, int line, int pile, int chnl)
        {
            return new BndBoxResult
            {
                X_axis = mdlOutput[GetOffset(line, pile, chnl++)],
                Y_axis = mdlOutput[GetOffset(line, pile, chnl++)],
                Breadth = modelOutput[GetOffset(line, pile, chnl++)],
                Heit = mdlOutput[GetOffset(line, pile, chnl++)],
                Confidence = Sigmoid(mdlOutput[GetOffset(line, pile, chnl++)])
            };
        }
        public static float[] ExtractClassProbs(float[] mdlOutput, int line, int pile, int chnl, float confidence, string[] lbls)
        {
            var classProbsOffset = chnl + ftsPerBox;
            float[] classProbs = new float[lbls.Length];
            for (int classProb = 0; classProb < lbls.Length; classProb++)
                classProbs[classProb] = mdlOutput[GetOffset(line, pile, classProb + classProbOffset)];
            return Softmax(classProbs).Select(q => q * confidence).ToArray();
        }
        private static float Sigmoid(float value)
        {
            var m = (float)Math.Exp(value);
            return m / (1.0f + m);
        }
        private static float[] Softmax(float[] classProbabilities)
        {
            var maximum= classProbs.Max();
            var expand = classProbs.Select(u => Math.Exp(u - maximum));
            var summation = exp.Sum();
            return exp.Select(u => (float)u / (float)summation).ToArray();
        }
        private void btnNewPrediction_Click(object sender, EventArgs e)
        {
            btnNewResult.Visible = false;
            imgResult.Visible = false;
            imgSelectButton.Visible = true;
        }
        private static int GetOffset(int line, int pile, int chnl)
        {
            const int chnlStride = lineCount * pileCount;
            return (chnl * chnlStride) + (pile * pileCount) + line;
        }
    }
    class BndBoxResult : BndBoxMeasurements
    {
        public float Confidence { get; set; }
    }
}
```

### Code explanation
To show the file dialog, the code in the function `private void imgSelectBtn_Click(object sender, EventArgs e)` is used.

The `ML.NET` code is in the constructor `public Form1()` for the form that is executed whenever the form appears as the main form.

You will give it empty data i.e, `var emptyStatistics` since you are using it for predictions, and give it a new list of data from the image input class i.e, `new List<ImageInput>()` that you created in the models folder.

You also need to do a pipeline to resize images using the `ImageResizingEstimator` that uses navigation called `Netron` and also use the image resizing parameters you set in the `ImageSettings` file in your `Models` folder.

The `InputColumnName` inputs the name of the image from the `ImageInput` file in the model folder.

You realize that there is a `_predictionEngine` in the `ML.NET` code, what this does is to receive the parameters of the image data when it is set to `context.model.CreatePredictionEngine<ImageInput, ImagePredictions>(model)` from the models folder.

In the button function, the prediction engine is used to take in the data that is to be predicted i.e, `image` from the file dialog, and where the image data after detection is to be stored. i.e, `var results`.

The code also has `BndBoxes`. This code includes the X-axis and Y-axis values, the height and width of the prediction levels. This code is auto-generated when the class is created.

Now, there are four classes in your `Models` folder that you created. i.e:

**Image settings class**

The image settings class is used to set the width and height of the images. The code below is used in the class.

```C#
Public class ImageSettings
{
  public const int imgHeit = 400;
  public const int imgBreadth =400;
}
```

**Image input class**

The image input class receives the data of the image that is to be predicted. This class takes properties from the images settings class and it is a bitmap type of data:

```C#
public class ImageInput
{
  [imageType(ImageSettings.imgHeit, ImageSettings.imgBreadth)]
  public Bitmap Image {get; set; }
}
```

### Adding a picture
The main thing remaining for your project is creating where you will store your image to do the predictions.

To do this, go to the `Toolbox` and select `PictureBox`, drag it to the form layout, give it the name `imgResult`, and implement it with the code function after the `for loop` i.e, `imagePrediction.Image = image;`

When you run your project, it will be able to detect and put labels on the objects in the image that you are detecting.

### Conclusion
From a better understanding and following of this tutorial, it is clear that object detection is not only implemented in python. It is also implemented in C# using the ML.NET framework provided the required NuGet packages are downloaded in the Microsoft Visual Studio.

Hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)