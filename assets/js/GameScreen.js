/*The fetch operation is applied to get the questions that will appear in the quiz from the json file. */

const fetchQuestions = async () =>{
    let URL ="/assts/json/Questions.json";
    try{
        const response = await fetch(URL);
        const data = response.json();
        return data;
    }catch(error){
        console.log("Error:", error);
    }
};
export const 
generateRandomUniqueQuestionNumbers =()=>{
    const randomUniqueQuestionNumbers =[];
    /*It will generate random and unique numbers every time */
    while(randomUniqueQuestionNumbers.length<10){
        const randomNumber =Math.floor(Math.random()*56);
        /*If you don't find the same number, add it. */
        if(!randomUniqueQuestionNumbers.includes(randomNumber)){
            randomUniqueQuestionNumbers.push(randomNumber);
        }
    }
    return randomUniqueQuestionNumbers;
}
/* We have previously created unique question numbers, now we are saving them to an array to use the questions that are the content of those question numbers, that is, the indexes. */
export const deneme = async () => {
    let questionNumbers = generateRandomUniqueQuestionNumbers();
    
    let questions =await fetchQuestions();

    const randomQuestions =questionNumbers.map((questionNumber) =>{
        return questions[questionNumber];
    });

    console.log("randomQuestions",randomQuestions);

}