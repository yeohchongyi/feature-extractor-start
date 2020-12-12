var featureExtractor, classifier, video, loss, redCount, blueCount

redCount = blueCount = 0

function setup() 
  noCanvas()
  video = createCapture(VIDEO)
  video.parent('video')
  featureExtractor = ml5.featureExtractor('MobileNet')
  classifier = featureExtractor.classification(video)
  setupButtons()
}

// A function to create the buttons
function setupButtons() {
  buttonA = select('#red')
  buttonB = select('#blue')
  buttonA.mousePressed(function () {
    redCount++
    classifier.addImage('red')
    select('#redCount').html(redCount)
  })
  buttonB.mousePressed(function () {
    blueCount++
    classifier.addImage('blue')
    select('#blueCount').html(blueCount)
  })

  train = select('#train')
  train.mousePressed(function () {
    classifier.train(function (lossValue) {
      // This is where we're actually training our model

      if (lossValue) {
        loss = lossValue
        select('#info').html('Loss: ' + loss)
      } else {
        select('#info').html('Done Training! Final Loss: ' + loss)
        select('#train').style('display', 'none')
        select('#predict').style('display', 'inline')
      }
    })
  })

  // Predict Button
  buttonPredict = select('#predict')
  buttonPredict.mousePressed(classify)
}
buttonA = select('#red')
buttonB = select('#blue')

buttonA.mousePressed(function () {
  redCount++
  classifier.addImage('red')
  select('#redCount').html(redCount)
})

buttonB.mousePressed(function () {
  blueCount++
  classifier.addImage('blue')
  select('#blueCount').html(blueCount)
})

train = select('#train')
train.mousePressed(function () {
  classifier.train(function (lossValue) {
    // This is where we're actually training our model

    if (lossValue) {
      loss = lossValue
      select('#info').html('Loss: ' + loss)
    } else {
      select('#info').html('Done Training! Final Loss: ' + loss)
      select('#train').style('display', 'none')
      select('#predict').style('display', 'inline')
    }
  })
})

buttonPredict = select('#predict')
buttonPredict.mousePressed(classify)

function classify() {
  classifier.classify(gotResults)
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
  }
	console.log(result)
  var answer = Math.max(result[0].confidence, result[1].confidence);
  if(answer == result[0].confidence){
	  select("body").style("background", result[0].label);
  }
  else{
	  select("body").style("background", result[1].label);
  }
  classify();
}