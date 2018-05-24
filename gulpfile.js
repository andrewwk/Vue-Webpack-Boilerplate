/*******************************************************************************
 *
 http://mikeeverhart.net/2016/01/deploy-code-to-remote-servers-with-gulp-js/
 Description:
 *
 *   Gulp file to push changes to remote servers (eg: staging/production)
 *
 * Usage:
 *
 *   gulp deploy --target
 *
 * Examples:
 *
 *   gulp deploy --production   // push to production
 *   gulp deploy --staging      // push to staging
 *
 ******************************************************************************/
const gulp   = require('gulp');
const gutil  = require('gulp-util');
const argv   = require('minimist')(process.argv);
const rsync  = require('gulp-rsync');
const prompt = require('gulp-prompt');
const gulpif = require('gulp-if');
// const path   = require('path');

const throwError = (taskName, msg) => {
  throw new gutil.PluginError({
    plugin  : taskName,
    message : msg
  });
};

gulp.task('deploy', () => {

  // Dirs and Files to sync
  rsyncPaths = ['./server/'];

  // Default options for rsync
  rsyncConf = {
    root             : './server/',
    progress         : true,
    incremental      : true,
    relative         : true,
    emptyDirectories : true,
    recursive        : true,
    progress         : true,
    clean            : false,
    dryrun           : false,
    exclude          : ['.DS_Store', 'CNAME', '.env', 'node_modules']
  };

  // Staging
  if (argv.staging) {

    rsyncConf.hostname    = '/* Staging IP or Hostname Here */';
    rsyncConf.username    = 'web'; // ssh username
    rsyncConf.destination = '/* server path ex. /var/www/stacklab-staging/html */';

  }
  // Production
  else if (argv.production) {

    rsyncConf.hostname    = '/* Production IP or Hostname Here */';
    rsyncConf.username    = 'web'; // ssh username
    rsyncConf.destination = '/* server path ex. /var/www/stacklab-production/html */';

  }
  // Missing/Invalid Target
  else {
    throwError('deploy', gutil.colors.red('Missing or invalid target'));
  }

  // Use gulp-rsync to sync the files
  return gulp.src(rsyncPaths)
             .pipe(gulpif(
               argv.production,
               prompt.confirm({
                 message : 'Heads Up! Are you SURE you want to push to PRODUCTION?',
                 default : false
               })
             ))
             .pipe(rsync(rsyncConf));
});
