/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('word_sounds').del()
  await knex('word_sounds').insert([
    {wordID: 1, language: 'ru', sound_file: '/sounds/family/семья.mp3'},
    {wordID: 2, language: 'ru', sound_file: '/sounds/family/мама.mp3'},
    {wordID: 3, language: 'ru', sound_file: '/sounds/family/папа.mp3'},
    {wordID: 4, language: 'ru', sound_file: '/sounds/family/сын.mp3'},
    {wordID: 5, language: 'ru', sound_file: '/sounds/family/дочь.mp3'},
    {wordID: 6, language: 'ru', sound_file: '/sounds/family/сестра.mp3'},
    {wordID: 7, language: 'ru', sound_file: '/sounds/family/брат.mp3'},
    {wordID: 8, language: 'ru', sound_file: '/sounds/family/бабушка.mp3'},
    {wordID: 9, language: 'ru', sound_file: '/sounds/family/дедушка.mp3'},
    {wordID: 10, language: 'ru', sound_file: '/sounds/family/тётя.mp3'},
    {wordID: 11, language: 'ru', sound_file: '/sounds/family/дядя.mp3'},

    {wordID: 1, language: 'en', sound_file: '/sounds/family/family.mp3'},
    {wordID: 2, language: 'en', sound_file: '/sounds/family/mother.mp3'},
    {wordID: 3, language: 'en', sound_file: '/sounds/family/father.mp3'},
    {wordID: 4, language: 'en', sound_file: '/sounds/family/son.mp3'},
    {wordID: 5, language: 'en', sound_file: '/sounds/family/daughter.mp3'},
    {wordID: 6, language: 'en', sound_file: '/sounds/family/sister.mp3'},
    {wordID: 7, language: 'en', sound_file: '/sounds/family/brother.mp3'},
    {wordID: 8, language: 'en', sound_file: '/sounds/family/grandmother.mp3'},
    {wordID: 9, language: 'en', sound_file: '/sounds/family/grandfather.mp3'},
    {wordID: 10, language: 'en', sound_file: '/sounds/family/aunt.mp3'},
    {wordID: 11, language: 'en', sound_file: '/sounds/family/uncle.mp3'},

    {wordID: 1, language: 'fi', sound_file: '/sounds/family/perhe.mp3'},
    {wordID: 2, language: 'fi', sound_file: '/sounds/family/äiti.mp3'},         
    {wordID: 3, language: 'fi', sound_file: '/sounds/family/isä.mp3'},          
    {wordID: 4, language: 'fi', sound_file: '/sounds/family/poika.mp3'},        
    {wordID: 5, language: 'fi', sound_file: '/sounds/family/tytär.mp3'},        
    {wordID: 6, language: 'fi', sound_file: '/sounds/family/sisko.mp3'},      
    {wordID: 7, language: 'fi', sound_file: '/sounds/family/veli.mp3'},         
    {wordID: 8, language: 'fi', sound_file: '/sounds/family/isoäiti.mp3'},        
    {wordID: 9, language: 'fi', sound_file: '/sounds/family/isoisä.mp3'},      
    {wordID: 10, language: 'fi', sound_file: '/sounds/family/täti.mp3'},       
    {wordID: 11, language: 'fi', sound_file: '/sounds/family/setä.mp3'},         

    {wordID: 1, language: 'ua', sound_file: '/sounds/family/сімья.mp3'}, 
    {wordID: 2, language: 'ua', sound_file: '/sounds/family/мама.mp3'},         
    {wordID: 3, language: 'ua', sound_file: '/sounds/family/тато.mp3'},        
    {wordID: 4, language: 'ua', sound_file: '/sounds/family/син.mp3'},        
    {wordID: 5, language: 'ua', sound_file: '/sounds/family/донька.mp3'},        
    {wordID: 6, language: 'ua', sound_file: '/sounds/family/сестра.mp3'},       
    {wordID: 7, language: 'ua', sound_file: '/sounds/family/брат.mp3'},         
    {wordID: 8, language: 'ua', sound_file: '/sounds/family/бабуся.mp3'},       
    {wordID: 9, language: 'ua', sound_file: '/sounds/family/дідусь.mp3'},       
    {wordID: 10, language: 'ua', sound_file: '/sounds/family/тітка.mp3'},       
    {wordID: 11, language: 'ua', sound_file: '/sounds/family/дядько.mp3'}    
  ]);
};