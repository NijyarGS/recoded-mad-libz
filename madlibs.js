/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
 


function parseStory(rawStory) {
  // Your code here.
  
  return fetch("story.txt")
  .then(response => response.text())
  .then(data => {

    const myWords = data.split(" ");
    
    const PARSING_REGEX = /(?<word>\w+)(?<pos>\[[nva]\])?(?<punct>[\,\.])?/
    
    let myWordsGroup =  myWords.map((e)=>{
      return PARSING_REGEX.exec(e).groups
    })

    return myWordsGroup;

  }
    )

  return {}; // This line is currently wrong :)
}


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madLibsEdit = document.querySelector('.madLibsEdit');
    const madLibsPreview = document.querySelector('.madLibsPreview')


    //////////////////////////////////////// madLibsPreview //////////////////////////////////////////////////
    processedStory.forEach((items)=>{

      let span = document.createElement('span') 

      span.innerHTML = items.word;

      if (items.pos !== undefined)
      {
        span.id = `${items.word}${items.pos}`
        span.innerHTML = "" 
        items.word.split('').forEach(()=>{span.innerHTML = span.innerHTML+ "_"})
      }
      if (items.punct !== undefined)
      {
        span.innerHTML = span.innerHTML + items.punct;
      }
      
      span.innerHTML = span.innerHTML + " ";
      madLibsPreview.appendChild(span);
    });
    

//////////////////////////////////////// madLibsEdit //////////////////////////////////////////////////
let inpId = 0;
    processedStory.forEach((items,lpNum)=> {
      
      //////// if NOT a input word /////////
      if (items.pos === undefined)
      {
        let span = document.createElement('span') 

        span.innerHTML = items.word;

        if (items.punct !== undefined)
      {
        span.innerHTML = span.innerHTML + items.punct;
      }

      span.innerHTML = span.innerHTML + " ";

      madLibsEdit.appendChild(span)
      }

      //////// if IS a input word /////////
      else if (items.pos !== undefined)
      {
        inpId=inpId+1;
        let input = document.createElement('input');

        input.type="text"
        input.placeholder = `${items.word}${items.pos}`;
        input.id=inpId;
        
        input.addEventListener('input', ()=>{
          let mySel = document.getElementById(`${items.word}${items.pos}`);
          if (input.value.length <= 20) {
            mySel.innerHTML = input.value;
            mySel.innerHTML = mySel.innerHTML + " ";
            mySel.className='glow'
            }
            else {
              console.log("above 20")
          }

          if (mySel.innerHTML===" ")
          {
            console.log('empty')
          }
        });
        
        input.addEventListener('keydown', (e)=>{
          if (e.key==='Enter')
          {
            detect = parseInt(input.id)+1
            // console.log(detect)
            // console.log (document.getElementById(`${detect}`))
            document.getElementById(`${detect}`).focus()
            
          }
        })

        madLibsEdit.appendChild(input)

        if (items.punct !== undefined)
        {
          let span = document.createElement('span')
          span.innerHTML = items.punct;
          span.innerHTML = span.innerHTML + " ";
          madLibsEdit.appendChild(span)
        }
        
      }

      

    });
    
    console.log(processedStory);
  });
