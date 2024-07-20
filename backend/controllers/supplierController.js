import validator from "validator";
import { createSupplier, getAllSupplier, getSupplierByName } from "../service/supplierService.js";
import supplierRouter from "../routes/supplierRoute.js";

export const createNewSupplier = (req, res) => {
  const body = req.body;
  addSupplier(body)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(200).send({ success: false, error: "Something went worng" });
    });
};

export const getSupplier = (req,res) => {
    getSupplierHandler().then((resp)=>{
        res.status(200).send(resp)
    }).catch((err)=>{
        res.status(200).send({success:false,error:"something went wrong"});
    })
}



// Async operation




const getSupplierHandler = async () =>{
    const result = await getAllSupplier();
    return {
        supplier : result,
        success:true,
    }
}
const addSupplier = async (body) => {
  if (!body.supplierName || validator.isEmpty(body.supplierName)) {
    return { success: false, error: "name is required" };
  }
  if (!body.contactName || validator.isEmpty(body.contactName)) {
    return { success: false, error: "contactName is required" };
  }
  if (!body.address || validator.isEmpty(body.address)) {
    return { success: false, error: "address is required" };
  }
  if (!body.city || validator.isEmpty(body.city)) {
    return { success: false, error: "city is required" };
  }
  if (!body.postalCode || validator.isEmpty(body.postalCode)) {
    return { success: false, error: "postalCode is required" };
  }
  if (!body.country || validator.isEmpty(body.country)) {
    return { success: false, error: "country is required" };
  }
  if (!body.phone || validator.isEmpty(body.phone)) {
    return { success: false, error: "phone is required" };
  }

  const newCategory = await getSupplierByName(body.supplierName);
  if (newCategory) {
    return {
      success: false,
      error: "Sorry,there is an category with this name.",
    };
  }

  try {
    const _category = await createSupplier(body);

    return {
      success: true,
      message: "category created successfully ",
    };
  } catch (err) {
    return {
      success: false,
      error: "oops,Something went wrong. please try again.",
    };
  }
};
