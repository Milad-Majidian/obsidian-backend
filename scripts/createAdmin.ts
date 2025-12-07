import bcrypt from "bcryptjs";
import { AdminModel } from "../src/modules/shared/models/admin.model";
import { connectToDb } from "../src/config/db";

async function run() {
  await connectToDb();
  console.log("Connected to DB");

  const hashed = await bcrypt.hash("Admin12345!", 10);

  await  AdminModel.create({
    email: "superAdmin@admin.com",
    password: hashed,
    role: "superAdmin",
  });

  console.log("Super admin created.");
  process.exit(0);
}

run();
