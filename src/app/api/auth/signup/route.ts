import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


export async function POST(request: Request) {
  try {
    await connectDB()
    const { fullname, email, password } = await request.json();

    console.log(fullname, email, password);
    
    if (password.length < 6)
    return NextResponse.json(
        {
        message: "Password must be at least 6 characters",
        },
        {
        status: 400,
        }
    );

    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        fullname,
        email,
        password: hashedPassword,
      });

    const savedUser = await user.save();

    return NextResponse.json(
        {
          _id: savedUser._id,
          email: savedUser.email,
          fullname: savedUser.fullname,

        }
      );
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return NextResponse.json(
          {
            message: error.message,
          },
          {
            status: 400,
          }
        );
      }
      return NextResponse.error();
    }
}
