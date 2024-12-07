function caloriesCalc(data) {
  event.preventDefault();
  let genderCal = parseInt(data.gender.value);
  let ageCal = parseInt(data.age.value);
  let heightCal = parseInt(data.height.value);
  let activityCal = parseInt(data.activity.value);
  let performanceCal = parseInt(data.performanceCal.value);
  const weightDigitsString = data.weightDigits.value;
  const cutstring = weightDigitsString.substring(0, 2);
  let weightCal = parseInt(cutstring) * 50;
  
  let dailyCalories = genderCal + ageCal + heightCal + activityCal + performanceCal + weightCal;

  localStorage.setItem('dailyCalories', dailyCalories);
  document.getElementById("daily-calories").textContent = dailyCalories;
}


// notify on screen
let calorieGoal = localStorage.getItem('dailyCalories');
if (calorieGoal == null) {
  document.getElementById("daily-calories").textContent = "0";
}
else{
  document.getElementById("daily-calories").textContent = calorieGoal;
};
