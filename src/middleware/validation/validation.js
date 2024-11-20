import fs from "fs"


const validation = (file, validation) => {
  async function getValidations() {
   
   try {
    const f = `../../helpers/validations/${file}.js`
      const module =  await import(f)
      
    
     return module.default[validation] ? module.default[validation] : false;
    
    } catch (error) {
    console.log(error);
    return  res.send("error validation")
   }
  }
  return async (req, res, next) => {
    const validations = await getValidations();

    try {
      if (!validations) throw new Error(`validation doenst exists in file ${file}.js`);
    
    } catch (error) {
      res.send("validation doesnt exists");
    }
      
    const errors = {};

    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        result.array().map((e) => {
          if (e.path in errors != true) errors[e.path] = e.msg;
        });
        continue;
      }
    }

    /**
     * 
    const auth = new AuthExceptions({
      name: "Validation",
      message: "validation error: invalid data recived",
      errors: errors,
    });
    auth.handler()
     */

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    next();
  };
};

export default validation
