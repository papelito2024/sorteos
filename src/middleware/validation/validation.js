import fs from "fs"

import AuthExceptions from  "../../utils/exceptions/authExceptions.js";

const validation = (file, validation) => {

  /**
   * 
   * @returns 
   * returns the express validation array  for the file asked 
   */
  async function getValidations() {
   
   try {
   
      const module =  await import(`../../helpers/validations/${file}.js`)

      if (!module.default[validation])  throw new Error(`validation doenst exists in file ${file}.js`);

     // console.log(module.default[validation])
      return module.default[validation]

    } catch (error) {

     
      const auth = new AuthExceptions(error);
      
      auth.handler()
      
      return auth.getErrorResponseFormat()
   }
  }


  /**
   * middleware function 
   */
  return async (req, res, next) => {
    const validations = await getValidations();

    if (!Array.isArray(validations)) {
      return res.status(409).json(validations);
    }
    
    const errors = {};

    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        result.array().map((e) => {
          //console.log(e)
          if (e.path in errors != true) errors[e.path] = e.msg;
        });
        continue;
      }
    }

    /**
     * 
   
     */
    console.log(errors)

     const auth = new AuthExceptions({
       name: "Validation",
       message: "validation error: invalid data recived",
       errors: errors,
     });
     auth.handler();

    if (Object.keys(errors).length > 0) return res.status(400).json(auth.getErrorResponseFormat());

    next();
  };
};

export default validation
