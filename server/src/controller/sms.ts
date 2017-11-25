
import * as _ from 'lodash';
import * as express from 'express';
import { Controller } from '../express/express';
import * as clickatell from '../lib/clickatell';
import { Sms as SmsModel, SmsItems } from '../models/models';

let compileSms = (item: {id: number, text: string; phones: string}) => {
  let result = [];

    let texts = item.text.split("\n");
    _.remove(texts, _.isEmpty);
    
    let phones = item.phones.split("\n");
    _.remove(phones, _.isEmpty);

    
    let phonesChunk = _.chunk(phones, phones.length/texts.length);

    for (let chunk in phonesChunk) {
      let msg = _.template(texts[chunk]);
      for(let phoneInfo of phonesChunk[chunk]) {
        phoneInfo = phoneInfo.split(';');

        let fname = _.capitalize(phoneInfo[0]);
        let lname = _.capitalize(phoneInfo[1]);
        let phone = _.capitalize(phoneInfo[2]);

        result.push({
          smsId: item.id,
          subId: chunk,
          fname: fname,
          lname: lname,
          phone: phone,
          text: msg({
            fullname: `${fname} ${lname}`,
            fname: fname,
            lname: lname,
          })
        });
      }
    }

  return result;
};


export class Sms extends Controller {
  title = 'SMS';

  constructor() {
    super('sms');
  }

  public index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    let debug = this.debug;

    (async function() {
      let newSms = await SmsModel.findAll({ where: { isParsed: 0 } });

      for(let item of newSms) {
        let result = compileSms(item);
          
        SmsItems.bulkCreate(result).then(() => {
          item.isParsed = 1;
          item.save();
        });
      }

      let toSend = await SmsItems.findAll({ where: { status: 'NEW' } });
      for (let sms of toSend) {
        let id = await clickatell.send(sms);
        sms.response = id;
        sms.clApiMsgId = id;
        sms.status = 'SEND';
        sms.save();
      }
 
      return true;
    })();


    return res.render("sms", {
      form: {
        text: '',
        to: ''
      },
      title: this.title
    });
  }

  public submit(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {

    req.assert("text", "Text cannot be blank").notEmpty();
    req.assert("to", "To cannot be blank").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      req.flash("errors", errors);

      // return res.redirect("/sms/");

      return res.render("sms", {
        form: req.body,
        title: this.title
      });
    }

    SmsModel.create({ text: req.body.text, phones: req.body.to }).then(() => {
      req.flash("success", { msg: 'Sms Added' });
      return res.redirect("/sms/");
    }).catch((e) => {
      console.error(e);
    });
    // 
    // const mailOptions = {
    //   to: "your@email.com",
    //   from: `${req.body.name} <${req.body.email}>`,
    //   subject: "Contact Form",
    //   text: req.body.message
    // };

  }

  public callback(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {

   
    (async function() {
      let sms = await  SmsItems.findOne({
         where: {
           clApiMsgId: req.body.apiMsgId
         },
       });

      if (sms) {
        sms.clCharge = req.body.charge;
        sms.clStatus = req.body.status;
        sms.clFrom = req.body.from;
        sms.save();
      }
      
    })();

    return res.sendStatus(200);
  }
}


