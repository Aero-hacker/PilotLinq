import { Button, Checkbox, Form, Input, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { IconMailFilled, IconLockFilled } from "@tabler/icons-react";
import appColors from "../../theme/common/colors";
import appAssets from "../../constants/assets";
import { motion } from "framer-motion";
import { useAuth } from "../../store";
import { useMutation } from "@tanstack/react-query";
import authApis from "../../api/methods/auth";
import { useNavigate } from "react-router-dom";

const dummyData = {
  Super_Admin: { email: "superuser@yopmail.com", password: "super@123" },
  LEA_Admin: {
    email: "districtadmin@example.com",
    password: "password",
  },
  School_Admin: { email: "school.af@yopmail.com", password: "Af@2024" },
  LEA_Sub_Admin: { email: "subadmin@yopmail.com", password: "Af@2024" },
  Parent: { email: "parent.af@yopmail.com", password: "Af@2024" },
  Teacher: { email: "teacher.af@yopmail.com", password: "Af@2024" },
  Student: { email: "student.af@yopmail.com", password: "Af@2024" },
  AttandanceCoordinator: {
    email: "cordinator.af@yopmail.com",
    password: "Af@2024",
  },
};

const LoginPage = () => {
  const [form] = useForm();
  const afterLogin = useAuth((state) => state.afterLogin);
  const navigate = useNavigate();
  const { mutate: logIn, isPending } = useMutation({
    mutationKey: authApis().login.mutationKey,
    mutationFn: authApis().login.mutationFn,
  });

  const fillFormWithRole = (role) => {
    form.setFieldsValue(dummyData[role]);
  };

  const handleLogin = async (values) => {
    logIn(values, {
      onSuccess: (data) => {
        afterLogin(
          data?.data?.token?.access,
          data?.data?.token?.access,
          data?.data?.user_role
        );
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="flex h-screen items-center justify-center p-4">
        <div
          style={{
            borderRadius: "20px",
          }}
          className="z-10 flex w-full max-w-4xl m-auto overflow-hidden bg-white"
        >
          <div className="flex items-center w-full lg:w-1/2 p-8">
            <div className="flex flex-col gap-2 w-full">
              <div className="m-auto mb-3 flex flex-row items-center justify-center">
                <img className="h-20" src={appAssets.common.logo} alt="" />
              </div>
              <div className="text-center pb-2">
                <p className="text-lg font-regular text-center text-slate-500">
                  Welcome to,
                </p>
                <p className="text-2xl font-semibold text-center text-slate-600">
                  My Attendance Flow
                </p>
              </div>

              <div className="mt-4">
                <Form form={form} layout="vertical" onFinish={handleLogin}>
                  <Space direction="vertical" className="w-full">
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <IconMailFilled size={24} fill={appColors.primary} />
                        }
                        size="large"
                        placeholder="Email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      className="mt-1"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <IconLockFilled size={24} fill={appColors.primary} />
                        }
                        size="large"
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Button
                      loading={isPending}
                      htmlType="submit"
                      type="primary"
                      size="large"
                      className="w-full mt-1"
                    >
                      Log In
                    </Button>
                  </Space>
                </Form>

                <p className="mt-3 text-sm text-center text-slate-500">
                  Don't have an account?{" "}
                  <a
                    onClick={() => {}}
                    className="text-primary cursor-pointer font-bold focus:outline-none focus:underline hover:underline"
                  >
                    Register
                  </a>
                </p>
                <div className="flex flex-wrap gap-2 justify-center w-full mt-6">
                  {[
                    "Super_Admin",
                    "LEA_Admin",
                    "School_Admin",
                    "LEA_Sub_Admin",
                    "Parent",
                    "Teacher",
                    "Student",
                    "AttandanceCoordinator",
                  ].map((role) => (
                    <Button
                      size="small"
                      key={role}
                      onClick={() => fillFormWithRole(role)}
                    >
                      {role.replace("_", " ")}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden lg:flex flex-col bg-cover lg:w-1/2 items-center justify-center"
            style={{
              margin: "8px",
              marginLeft: "32px",
              borderRadius: "16px",
              backgroundImage: `url(https://img.freepik.com/free-photo/view-3d-school-bus_23-2151103702.jpg?t=st=1734029037~exp=1734032637~hmac=ef4a4fd49708e31a477f9fdf79ab8156bd06f23f7705ade0fc25562ece1d09ce&w=1060)`,
            }}
          ></div>
          <div className="mt-4"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
