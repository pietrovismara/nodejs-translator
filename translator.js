var translate = require('./tasks/translate');

var input_file_path = process.argv[2];
var input_language = process.argv[3];
var output_language = process.argv[4];
var output_file_folder = process.argv[5] || './output/';

translate(input_file_path, output_file_folder, input_language, output_language);
