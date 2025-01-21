const apiEndpoints = {
  appControl: {
    versionInfo: "",
  },
  auth: {
    login: "user/login/",
    forgotPassaword: "user/forgot-password/",
    resetPassword: "user/reset-password/",
    refresh: "user/token/refresh/",
    updateProfile: "User/UpdateUserProfile/",
    getProfile: "user/profile/",
  },
  users: {
    getStudentsByParent: "user/get-parent-students-list/",
  },
  leaves: {
    raiseRequest: "leaves/create-leave-request/",
    parentRequestList: "leaves/parent-list-leave-requests/",
    parentPreviousRequestList: "leaves/parent-leavehistory-requests/",
  },
  admin: {
    adminprofile: "/user/profile/",
    adminlisting: "/user/admin/get-district-admin-listing/",
    admindetail: "/user/admin/view-district-admin-detail/",
    createadmin: "/user/admin/create-district-admin/",
    viewschoolslist: "/user/admin/view-school-lists/3",
    viewstudentslist: "/user/admin/view-students-lists/11",
    viewparentslist: "/user/admin/view-parents-lists/10",
    viewteacherslist: "/user/admin/view-teachers-lists/10",
  },
};

export default apiEndpoints;
