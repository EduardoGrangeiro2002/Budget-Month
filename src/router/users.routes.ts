import { Router } from "express";
import { makeFactoryUsers } from "../factory/makeFactoryUsers";

const router = Router()

const usersControllers = makeFactoryUsers()

router.post("/create", (req, res) => usersControllers.create(req, res))
router.post("/update", (req, res) => usersControllers.updateById(req, res))
router.post("/list", (req, res) => usersControllers.list(req, res))
router.get("/list-id/:id_user", (req, res) => usersControllers.listById(req, res))
router.delete("/delete-id/:id_user", (req, res) => usersControllers.deleteById(req, res))

export default router