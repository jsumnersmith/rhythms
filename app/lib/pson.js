var LanguageDetect = require('languagedetect');
var lngDetector = new LanguageDetect();

module.exports = function(data){
  // We're looking for data.author, data.title, and data.text
  // for the time being.

  // TODO: infer alignment from richText (or accept it wholecloth);
  // Step 1: split out lines.
  var lines =  data.text.split("\n")

  return psonLines = lines.map(function(line, i){
    var lang = data.language || lngDetector.detect(line);
    return {
      text: line,
      lineNumber: i,
      meta: {
        author: data.author,
        title: data.title,
        language: (data.language ? lang : lang[0][0]),
      },
      layout: {
        // Find the first non-whitespace character.
        // and infer whitespace of indentation.
        indentation: line.search(/\S/),
        layout: 'left', // Need to find a way to actually do this.
        indentOverflow: data.indentOverflow || true // Need to find a way to get this.
      }
    };
  });
}
