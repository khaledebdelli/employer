function npmls(cb) {
    require('child_process').exec('npm ls --json', function(err, stdout, stderr) {
        if (err) return cb(err)
        cb(null, JSON.parse(stdout));
    });
}
npmls(console.log);