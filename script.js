/*Information Page Javascript*/
// prints "hi" in the browser's dev tools console

let total_cases = null;
let total_deaths = null;
let recovered = null;

let global_cases = null;
let filter = null;

let current = null;
let mid = null;
let critical = null;

function pullinfo() {
  $.ajax({
    url: "https://covid19-server.chrismichael.now.sh/api/v1/AllReports",
    type: "GET",
    success: function(response) {
      // global_cases = global_cases.map((country) => {
      //   filter = response.reports[0].table[0][213].Continent;
      //   console.log(filter);
      //   if(country.Continent !== filter){
      //       $("#info_holder").append("<p>"+country.TotalCases+"</p>");
      //      }
      //   return
      // });

      //pastes top three
      total_cases = response.reports[0].cases;
      total_deaths = response.reports[0].deaths;
      recovered = response.reports[0].recovered;

      $("#cases h2").append(addCommas(total_cases));
      $("#deaths h2").append(addCommas(total_deaths));
      $("#recovered h2").append(addCommas(recovered));

      //pastes left box
      current = response.reports[0].active_cases[0].currently_infected_patients;
      $("#active").append(addCommas(current));

      mid = response.reports[0].active_cases[0].inMidCondition;
      $("#mid").append(addCommas(mid));

      critical = response.reports[0].active_cases[0].criticalStates;
      $("#critical").append(addCommas(critical));

      //pastes individual country info
      filter = response.reports[0].table[0][18].TotalCases;
      filter = filter.replace(",", "");
      filter = parseInt(filter);
      console.log(filter);

      global_cases = response.reports[0].table[0];
      let x = null;
      // console.log(global_cases);
      global_cases = global_cases.map(country => {
        x = country.TotalCases;
        x = x.replace(",", "");

        if (x > filter) {
          $("#countries").append(
            "<p>" +
              country.Country +
              ", " +
              country.Continent +
              ": " +
              country.TotalCases +
              " active cases" +
              "</p>"
          );
        }
      });
    }
  });
}

function addCommas(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

pullinfo();

/*Wellness Quiz JavaScript*/
let emotion = 0;
let question = 1;
$("#quizarea").hide();
$("#choiceoneimg").hide();
$("#choicetwoimg").hide();
console.log(question);
$("#quizbegin").click(function() {
  $("#quizarea").show();
  $("#quizbegin").hide();
});
function questionChange(question, choiceone, choicetwo) {
  $("#quizquestion").text(question);
  $("#choiceone").text(choiceone);
  $("#choicetwo").text(choicetwo);
}
function results(whatemotionequalstoo) {
  if (whatemotionequalstoo > 3) {
    $("#resultstitle").text(
      "Hey...you seem a bit down. I reccomend you find something to do or someone to talk to. You can check out the Resources Column in the stress relief page for more information."
    );
    $("#choiceoneimg").show();
  } else {
    $("#resultstitle").text(
      "Hey...you seem a okay, but if your feeling down, try doing an activity! You can check out the Games and Activities Column in the stress relief page for ideas!"
    );
    $("#choicetwoimg").show();
  }
}
$("#choiceone").click(function() {
  if (question === 1) {
    question = question + 1;
    questionChange(
      "Question Two: Which of the following best describes how you feel during self isolation?",
      "I feel uncomfortable, anxious, or despondent",
      "I feel energized, motivated,or just fine."
    );
  } else if (question === 2) {
    questionChange(
      "Question Three: Which of these most closely describes your feelings about the pandemic?",
      "I am alert.",
      "I am anxious."
    );
    question = question + 1;
    emotion = emotion + 1;
  } else if (question === 3) {
    questionChange(
      "Question Four: How do you feel with the extra time you may have and boredom associated with it?",
      "I can manage my time, find things to do with my extra time, do not have extra time or do not get bored.",
      "I am overwhelmed with the amount of time I have, lack of time or boredom I experience. I find it hard to motivate myself to do things or find things to do."
    );
    question = question + 1;
  } else if (question === 4) {
    questionChange(
      "Question Five: In general, are your feelings lean more towards positive or negative?",
      "Positive",
      "Negative"
    );
    question = question + 1;
  } else if (question === 5) {
    $("#quizquestion").hide();
    $("#choiceone").hide();
    $("#choicetwo").hide();
    results(emotion);
  }
});
$("#choicetwo").click(function() {
  if (question === 1) {
    question = question + 1;
    questionChange(
      "Question Two: Which of these best describes how you feel in self isolation?",
      "I feel uncomfortable, anxious, or despondent",
      "I feel energized, motivated,or just fine."
    );
    emotion = emotion + 1;
  } else if (question === 2) {
    questionChange(
      "Question Three: Which of these most closely describes your feelings about the pandemic?",
      "I am alert.",
      "I am anxious."
    );
    question = question + 1;
  } else if (question === 3) {
    questionChange(
      "Question Four: How do you feel with the extra time you may have and boredom associated with it?",
      "I can manage my time, find things to do with my extra time, do not have extra time or do not get bored.",
      "I am overwhelmed with the amount of time I have, lack of time or boredom I experience. I find it hard to motivate myself to do things or find things to do."
    );
    question = question + 1;
    emotion = emotion + 1;
  } else if (question === 4) {
    questionChange(
      "Question Five: In general, are your feelings lean more towards positive or negative?",
      "Positive",
      "Negative"
    );
    emotion = emotion + 1;
    question = question + 1;
  } else if (question === 5) {
    emotion = emotion + 1;
    $("#quizquestion").hide();
    $("#choiceone").hide();
    $("#choicetwo").hide();
    results(emotion);
  }
});

// /*slideshow for the timeline
// var slideIndex= 1;
//    showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//    showSlides((slideIndex += n));
//  }

// // Thumbnail image controls 
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("slides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//    for (i = 0; i < slides.length; i++) {
//      slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   /*dots[slideIndex-1].className += " active";
//  }
