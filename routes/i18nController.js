var i18n = require('i18n');
var fs = require('fs');
var _ = require('underscore');

exports.locales = function(req, res) {
    // TODO: automatically get all locale files
    fs.readdir(__dirname + '/../setting/locales', function(err, files) {
        var locales = files.map(function(file) {
            return file.replace(".json", "");
        });
        res.json(locales);
    });
};
exports.setLocale = function(req, res) {
    var newLocale = req.body.locale;
    req.setLocale(newLocale);
    res.json({
        msg: req.getLocale()
    })
};