import * as _ from 'lodash';
import * as rp from 'request-promise';

export function send(sms: {phone: string; text: string}) {
    let params = {
      user: 'prapor',
      pass: 'praportest1',
      api: '3642879',
      to: _.replace(sms.phone, '+', ''),
      // to: '380632519584',
      msg: sms.text
    } 
    console.log(params);
    let clickRequest = _.template('http://api.clickatell.com/http/sendmsg?user=<%=user%>&password=<%=pass%>&api_id=<%=api%>&to=<%=to%>&text=<%=msg%>');

    return (async function() {
      let response = await rp(clickRequest(params));
      return _.replace(response, 'ID: ', '');
    })();
  };
