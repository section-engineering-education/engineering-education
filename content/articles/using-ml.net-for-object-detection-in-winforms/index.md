### Introduction
Object detection is the ability of a program to be able to detect objects in an image. ML lets the .NET developers implement this feature by using the ML.NET framework that they can use to create custom ML models using C# or F# without having to leave the .NET ecosystem.

In this article, we shall be looking at how we can implement the same ML.NET framework in a windows forms app to create a C# project that can detect objects in an image.

### Prerequisites
- Basic understanding of C# that can be read from the Microsoft website [here](https://docs.microsoft.com/en-us/dotnet/csharp/)
- Basic understanding of [.NET](https://docs.microsoft.com/en-us/dotnet/) development platform
- Have Microsoft Visual Studio installed or download Visual Studio from Microsoft's site [here](https://visualstudio.microsoft.com/vs/)

The first step is opening the visual studio and following the steps below.
1. Click on `Create new project`.
2. On the next screen search for `Windows Forms` and select `Windows Forms App(.NET Framework)` and select the one that is using `C#`. and click `Next`
3. Enter the name of the project you want to create i.e, `Win_Forms_ObjectDetection`, and click `create`.
![Project name](/engineering-education/using-ml.net-for-object-detection-in-winforms/projectname.jpg)
The form designer should look at the one shown in the figure below.
![Design](/engineering-education/using-ml.net-for-object-detection-in-winforms/appearance.jpg)

You will be required to download some nugget packages for the object detection to be effective. These packages are `Microsoft.ML`, `Microsoft.ML.OnnxRuntime`, and because you are dealing with object detection you will also download `Microsoft.ML.Image.Analytics`. You will also download `Microsoft.ML.OnnxTransformer` because you are using the Microsoft object detection model.

You will encounter an error when you build the project, this is because `ML.NET` supports only a 64-bit processor and the settings is 32-bit processor. To solve this error you have to right-click on the project name and navigate to properties, then go to build and select `x64` under `platform target`


Now on the toolbox sidebar, drag a `Button` and drop at the bottom of the form designer tab. Go to the properties side and rename it from `button1` to `Select Image`.
On the same properties sidebar, scroll down to `Name` and change the name to give it the name `btnSelectImage`.

To make the `btnSelectImage` functional you shall use the `fileSystemWatcher` and the `openFileDialog` which goes at the bottom of the window that you shall rename to `fileWatcher` and `fileDialog` respectively. A `fileSystemWatcher` watches for different changes in the and the file directory `openFileDialog` asks the user to open a file and select a file from it.
You shall also create some folders i.e, `MLmodels` and `Models` for different classes that you shall be using.

In your `MLModels` folder, you will add `labels.txt` file that contains `red`, `blue`, `white`, and `green` colors which give the different labels that we are using and the `model.onnx` file from the custom vision.

You will create four classes in your `Models` folder i.e, `ImageSettings`, `ImageInputs`, `ImagePredictions`, and `BoundingBox`.

Now, double click on the button you created to open `form1.cs` that you shall add the following code to enable the click event.
```C#
namespace ObjectDetection
{
    public partial class Form1 : Form
    {
        public const int rowCount = 12, columnCount = 12;
        public const int featuresPerBox = 6;
        private static readonly (float x, float y)[] boxAnchors = { (0.564f, 0.688f), (1.80f, 2.00f), (3.44f, 5.67f), (7.68f, 3.55f), (9.88f, 9.20f) };
        private PredictionEngine<ImageInput, ImagePredictions> _predictionEngine;
        public Form1()
        {
            InitializeComponent();
            picPrediction.Visible = false;
            var context = new MLContext();
            var emptyData = new List<ImageInput>();
            var data = context.Data.LoadFromEnumerable(emptyData);
            var pipeline = context.Transforms.ResizeImages(resizing: ImageResizingEstimator.ResizingKind.Fill, outputColumnName: "data", imageWidth: ImageSettings.imageWidth, imageHeight: ImageSettings.imageHeight, inputColumnName: nameof(ImageInput.Image))
                            .Append(context.Transforms.ExtractPixels(outputColumnName: "data"))
                            .Append(context.Transforms.ApplyOnnxModel(modelFile: "./MLModel/model.onnx", outputColumnName: "model_outputs0", inputColumnName: "data"));
            var model = pipeline.Fit(data);
            _predictionEngine = context.Model.CreatePredictionEngine<ImageInput, ImagePredictions>(model);
        }
        private void btnSelectImage_Click(object sender, EventArgs e)
        {
            if (fileDialog.ShowDialog() == DialogResult.OK)
            {
                var image = (Bitmap)Image.FromFile(fileDialog.FileName);
                var prediction = _predictionEngine.Predict(new ImageInput { Image = image });
                var labels = File.ReadAllLines("./MLModel/labels.txt");
                var boundingBoxes = ParseOutputs(prediction.ImageType, labels);
                var originalWidth = image.Width;
                var originalHeight = image.Height;
                if (boundingBoxes.Count > 1)
                {
                    var maxConfidence = boundingBoxes.Max(b => b.Confidence);
                    var topBoundingBox = boundingBoxes.FirstOrDefault(b => b.Confidence == maxConfidence);
                    boundingBoxes.Clear();
                    boundingBoxes.Add(topBoundingBox);
                }
                else
                {
                    MessageBox.Show("No prediction for image");
                    return;
                }
                foreach (var boundingBox in boundingBoxes)
                {
                    float x = Math.Max(boundingBox.Dimensions.X, 0);
                    float y = Math.Max(boundingBox.Dimensions.Y, 0);
                    float width = Math.Min(originalWidth - x, boundingBox.Dimensions.Width);
                    float height = Math.Min(originalHeight - y, boundingBox.Dimensions.Height);

                    // fit to current image size
                    x = originalWidth * x / ImageSettings.imageWidth;
                    y = originalHeight * y / ImageSettings.imageHeight;
                    width = originalWidth * width / ImageSettings.imageWidth;
                    height = originalHeight * height / ImageSettings.imageHeight;
                    using (var graphics = Graphics.FromImage(image))
                    {
                        graphics.DrawRectangle(new Pen(Color.Red, 3), x, y, width, height);
                        graphics.DrawString(boundingBox.Description, new Font(FontFamily.Families[0], 30f), Brushes.Red, x + 5, y + 5);
                    }
                }
                imagePrediction.Image = image;
                imagePrediction.SizeMode = PictureBoxSizeMode.AutoSize;
                imagePrediction.Visible = true;
                btnSelectImage.Visible = false;
                btnNewPrediction.Visible = true;
            }
        }
        public static List<BoundingBox> ParseOutputs(float[] modelOutput, string[] labels, float probabilityThreshold = .5f)
        {
            var boxes = new List<BoundingBox>();
            for (int row = 0; row < rowCount; row++)
            {
                for (int column = 0; column < columnCount; column++)
                {
                    for (int box = 0; box < boxAnchors.Length; box++)
                    {
                        var channel = box * (labels.Length + featuresPerBox);
                        var boundingBoxPrediction = ExtractBoundingBoxPrediction(modelOutput, row, column, channel);
                        var mappedBoundingBox = MapBoundingBoxToCell(row, column, box, boundingBoxPrediction);
                        if (boundingBoxPrediction.Confidence < probabilityThreshold)
                            continue;
                        float[] classProbabilities = ExtractClassProbabilities(modelOutput, row, column, channel, boundingBoxPrediction.Confidence, labels);
                        var (topProbability, topIndex) = classProbabilities.Select((probability, index) => (Score: probability, Index: index)).Max();
                        if (topProbability < probabilityThreshold)
                            continue;
                        boxes.Add(new BoundingBox
                        {
                            Dimensions = mappedBoundingBox,
                            Confidence = topProbability,
                            Label = labels[topIndex]
                        });
                    }
                }
            }
            return boxes;
        }
        private static BoundingBoxDimensions MapBoundingBoxToCell(int row, int column, int box, BoundingBoxPrediction boxDimensions)
        {
            const float cellWidth = ImageSettings.imageWidth / columnCount;
            const float cellHeight = ImageSettings.imageHeight / rowCount;
            var mappedBox = new BoundingBoxDimensions
            {
                X = (row + Sigmoid(boxDimensions.X)) * cellWidth,
                Y = (column + Sigmoid(boxDimensions.Y)) * cellHeight,
                Width = (float)Math.Exp(boxDimensions.Width) * cellWidth * boxAnchors[box].x,
                Height = (float)Math.Exp(boxDimensions.Height) * cellHeight * boxAnchors[box].y,
            };
            // The x,y coordinates from the (mapped) bounding box prediction represent the center
            // of the bounding box. We adjust them here to represent the top left corner.
            mappedBox.X -= mappedBox.Width / 2;
            mappedBox.Y -= mappedBox.Height / 2;

            return mappedBox;
        }
        private static BoundingBoxPrediction ExtractBoundingBoxPrediction(float[] modelOutput, int row, int column, int channel)
        {
            return new BoundingBoxPrediction
            {
                X = modelOutput[GetOffset(row, column, channel++)],
                Y = modelOutput[GetOffset(row, column, channel++)],
                Width = modelOutput[GetOffset(row, column, channel++)],
                Height = modelOutput[GetOffset(row, column, channel++)],
                Confidence = Sigmoid(modelOutput[GetOffset(row, column, channel++)])
            };
        }
        public static float[] ExtractClassProbabilities(float[] modelOutput, int row, int column, int channel, float confidence, string[] labels)
        {
            var classProbabilitiesOffset = channel + featuresPerBox;
            float[] classProbabilities = new float[labels.Length];
            for (int classProbability = 0; classProbability < labels.Length; classProbability++)
                classProbabilities[classProbability] = modelOutput[GetOffset(row, column, classProbability + classProbabilitiesOffset)];
            return Softmax(classProbabilities).Select(p => p * confidence).ToArray();
        }
        private static float Sigmoid(float value)
        {
            var k = (float)Math.Exp(value);
            return k / (1.0f + k);
        }
        private static float[] Softmax(float[] classProbabilities)
        {
            var max = classProbabilities.Max();
            var exp = classProbabilities.Select(v => Math.Exp(v - max));
            var sum = exp.Sum();
            return exp.Select(v => (float)v / (float)sum).ToArray();
        }
        private void btnNewPrediction_Click(object sender, EventArgs e)
        {
            btnNewPrediction.Visible = false;
            imagePrediction.Visible = false;
            btnSelectImage.Visible = true;
        }
        private static int GetOffset(int row, int column, int channel)
        {
            const int channelStride = rowCount * columnCount;
            return (channel * channelStride) + (column * columnCount) + row;
        }
    }
    class BoundingBoxPrediction : BoundingBoxDimensions
    {
        public float Confidence { get; set; }
    }
}
```

From the code above;
To show the file dialog, the code in the function `private void btnSelectImage_Click(object sender, EventArgs e)` is used.

The `ML.NET` code is in the constructor `public Form1()` for the form that is executed whenever the form appears as the main form. You will give it empty data i.e, `var emptyData` since you are using it for predictions, and give it a new list of data from the image input class i.e, `new List<ImageInput>()` that you created in the models folder.

You will also need to do a pipeline to resize images using the `ImageResizingEstimator` that uses navigation called `Netron` and also use the image resizing parameters you set in the `ImageSettings` file in your `Models` folder.

The `InputColumnName` inputs the name of the image from the `ImageInput` file in the model folder.

You can also realize that there is a `_predictionEngine` in the `ML.NET` code, what this does is to receive the parameters of the image data when it is set to `context.model.CreatePredictionEngine<ImageInput, ImagePredictions>(model)` from the models folder.

In the button function, the prediction engine is used to take in the data that is to be predicted i.e, `image` from the file dialog, and where the image data after detection is to be stored. i.e, `var predictions`.

The code also has `BoundingBoxes. This code includes the X and Y values, the height and width of the prediction levels. This code is auto-generated when the class is created.

Now, there are four classes in your `Models` folder that you created. The code in this class files are not to be changed since they are auto-generated, but you can edit the code in the `ImageSettings` file and use the type of width and height that you wish to use.

There is one thing remaining in the code, creating where we shall put the information you have been writing in the form of code above. To do this, go to the `Toolbox` and select `PictureBox`, drag it to the form layout, give it the name `imagePrediction`, and implement it with the code function after the `for loop` i.e, `imagePrediction.Image = image;`

When you debug your project, it should be able to detect and put labels on the objects in the images that you are detecting.
#### Conclusion
From a better understanding and following of this tutorial, it is clear that object detection is not only implemented in python. It is also implemented in C# using the ML.NET framework provided the required nuggets packages are downloaded in the Microsoft Visual Studio.
