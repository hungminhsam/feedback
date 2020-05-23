export default (emailsString) => {
  const emails = emailsString
    .trim()
    .split(",")
    .map((email) => email.trim());

  if (!emails[emails.length - 1]) emails.pop();

  //extract the invalid emails
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const invalidEmails = emails.filter((email) => regex.test(email) === false);

  //set the invalid email error message
  let invalidEmailMsg = "";
  invalidEmails.forEach(
    (email) => (invalidEmailMsg += `"${email}" is not a valid email. `)
  );

  return invalidEmailMsg;
};
