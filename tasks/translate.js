var fs = require('fs');
var async = require('async');
var MsTranslator = require('mstranslator');
var settings = require('../settings.json');

var getClass = {}.toString;

function translate (input_file_path, output_file_folder, input_language, output_language) {
    var translated_file_path = output_file_folder + output_language + '.json';

    // Set up MsTranslator keys
    var client = new MsTranslator({
        client_id: settings.client_id,
        client_secret: settings.client_secret
    }, true);

    var original = require(input_file_path);
    var translated = JSON.parse(JSON.stringify(original));

    console.log('Start translation of: ', input_file_path);
    console.log('From ' + input_language + ' to ' + output_language);

    var translate_tasks = [];
    var params = {
        text: '',
        from: input_language,
        to: output_language
    };

    // For each key in the original file add a translation async task
    Object.keys(original).forEach(function(key) {
        if (getClass.call(original[key]) === '[object Object]') {
            // If namespaced key translate the nested keys
            Object.keys(original[key]).forEach(function(nested) {
                translate_tasks.push(function(callback) {
                    params.text = original[key][nested];
                    client.translate(params, function(err, data) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        }
                        translated[key][nested] = data;
                        console.log("ORIGINAL", original[key][nested]);
                        console.log("TRANSLATED", translated[key][nested]);
                        callback();
                    });
                });
            });
        } else {
            translate_tasks.push(function(next) {
                params.text = original[key];
                client.translate(params, function(err, data) {
                    if (err) {
                        console.log(err);
                        next(err);
                    }
                    translated[key] = data;
                    console.log("ORIGINAL", original[key]);
                    console.log("TRANSLATED", translated[key]);
                    next();
                });
            });
        }
    });

    // Execute the translation tasks and save the resulting object to a JSON file
    async.series(translate_tasks, function(err, res) {
        if (err) {
            console.log(err);
            return;
        } else {
            fs.writeFile(translated_file_path, JSON.stringify(translated, null, 4), function(err) {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    console.log("Translated file saved to: ", translated_file_path);
                }
            });
        }
    });
}

module.exports = translate;
