const path = require('path')
const { fork } = require('child_process')

/**
 * Spin up the webserver
 *
 * Use environment variables to change the ports to be used:
 * - `WEBSERVER_PORT` will change the port used in DEV, or default to `3000`
 *
 * This is a custom NextJS server. Find more information about it in their documentation:
 * https://nextjs.org/docs/advanced-features/custom-server
 */
fork(path.join(__dirname, 'servers/web'))

/**
 * Spin up the mailserver
 *
 * Use environment variables to change the ports to be used:
 * - `MAILSERVER_DEV_PORT` will change the port used in DEV, or default to `25`
 * - `MAILSERVER_PROD_PORT` will change the port used in PROD, or default to `25`
 *
 * This is a custom Nodemailer SMTP server. Find more information about it in their documentation:
 * https://nodemailer.com/extras/smtp-server
 */
fork(path.join(__dirname, 'servers/mail'))
