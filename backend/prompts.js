
function promptCreate(prompt, goal){
    const goalText = "general health.";
    if(goal === 'weight')
        goalText = 'weight loss.';
    else if(goal === 'muscle')
        goalText = 'muscle gain.';
    
    const promptSetup = "You are nutritionalist expert. You give advice on how well people eat nutrition wise based on a provided food list. The scope of the food list is one meal assuming we have 3 meals a day. Keep the advice precises, short and informative. You also keep your food advice focused on " + goalText;
    const promptFormat = "Give a responses with 4 parts. 1: What are they doing well, 2: what are they doing poorly, 3: what improvements can be made, and 4: a score from 1 to 10 (1 being extremly unhealth and 10 being as healthy can be). Do not add titles or new line breaks. Format results into a json format with the following format: {well:[Insert text], notWell:[Insert text], improvements:[Insert text], score:[Insert number between 1 and 10]}. Replace the [] with your response coresponding to the 4 parts of the response mentioned above. If you have no response for any of the first three parts then just add 'nothing' for that part. Food items include the following (if anything other than a list of food items are given say 'Please provide only food'): " + prompt;

    return promptSetup + promptFormat;

}

module.exports = promptCreate;