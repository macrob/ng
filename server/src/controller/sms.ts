
import * as _ from 'lodash';
import * as express from 'express';
import { Controller } from '../express/express';


export class Sms extends Controller {
  title = 'SMS';

  constructor() {
    super('index');
  }

  public index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {

    return res.render("sms", {
      form: {
        text: '',
        to: ''
      },
      title: this.title
    });
  }

  public submit(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {

    req.assert("name", "Name cannot be blank").notEmpty();
    req.assert("email", "Email is not valid").isEmail();
    req.assert("message", "Message cannot be blank").notEmpty();

    const errors = req.validationErrors();

    // console.log(req.body);
    if (errors) {
      req.flash("errors", errors);

      // return res.redirect("/sms/");

      return res.render("sms", {
        form: req.body,
        title: this.title
      });
    }
    
    const mailOptions = {
      to: "your@email.com",
      from: `${req.body.name} <${req.body.email}>`,
      subject: "Contact Form",
      text: req.body.message
    };

  }

}


