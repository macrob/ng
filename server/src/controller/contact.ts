
import * as _ from 'lodash';
import * as express from 'express';
import { Controller } from '../express/express';


export class Contact extends Controller {
  title = 'Contact';

  constructor() {
    super('index');
  }

  public index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    return res.render("contact", {
      title: "Contact"
    });
  }

  public submit(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {

    req.assert("name", "Name cannot be blank").notEmpty();
    req.assert("email", "Email is not valid").isEmail();
    req.assert("message", "Message cannot be blank").notEmpty();

    const errors = req.validationErrors();


    if (errors) {
      req.flash("errors", errors);
      console.log(errors);
      return res.redirect("/contact");
    }

    const mailOptions = {
      to: "your@email.com",
      from: `${req.body.name} <${req.body.email}>`,
      subject: "Contact Form",
      text: req.body.message
    };

    // transporter.sendMail(mailOptions, (err) => {
    //   if (err) {
    //     // req.flash("errors", { msg: err.message });
    //     return res.redirect("/contact");
    //   }
    //   // req.flash("success", { msg: "Email has been sent successfully!" });
    //   res.redirect("/contact");
    // });
  }

}


