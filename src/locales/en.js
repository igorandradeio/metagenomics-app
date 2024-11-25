import { errorMessages } from 'vue/compiler-sfc'

export const en = {
  entity: {
    project: 'project',
    sample: 'sample',
    assembly: 'assembly',
    annotation: 'annotation',
    task: 'task',
  },
  dashboard: {
    sidebar: {
      project: {
        title: 'Project',
        index: 'My Projects',
        create: 'New Project',
      },
      assembler: {
        title: 'Assembler',
        index: 'My Assemblies',
        create: 'New Assembly',
      },
      task: {
        title: 'Tasks',
        index: 'My Tasks',
      },
      theme: 'Theme',
      dashboard: 'Dashboard',
      colors: 'Colors',
      typography: 'Typography',
    },
    project: {
      tableTitle: 'Projects',
    },
  },
  formLogin: {
    signInTitle: 'Sign In',
    signUpTitle: 'Sign up',
    signInMessage: 'Sign In to your account',
    signUpMessage: `Don't have an account ?`,
    forgotPassword: 'Forgot password ?',
    registerButton: 'Register Now!',
    password: 'Password',
    invalidPassword: 'Please enter your password',
    invalidEmail: 'Please Enter a valid email address',
    feedbackValid: 'Looks good!',
    networkError: `We're not able to contact the server`,
    passwordError: 'Incorrect password',
    userNotFound: 'User not found',
    genericError: 'Oops! Something went wrong',
  },
  formRegister: {
    errorEmail: 'The provided email is already in use.',
  },
  notification: {
    successfulMessage: `The {entity} has been {action}!`,
    errorMessage: 'Something went wrong. Please try again later',
    title: {
      success: 'Success',
      error: 'Error',
    },
    actions: {
      created: 'created',
      deleted: 'deleted',
      updated: 'updated',
      revoked: 'revoked',
      scheduled: 'scheduled'
    },
  },
  modal: {
    delete: {
      title: `Delete {entity}`,
      text: 'Are you sure you want to delete this {entity} ?',
      button: {
        cancel: 'Cancel',
        confirm: 'Delete',
      },
    },
    stop: {
      title: `Stop {entity}`,
      text: 'Are you sure you want to stop this {entity} ?',
      button: {
        cancel: 'Cancel',
        confirm: 'Confirm',
      },
    },
  },
  task: {
    status: {
      revoked: 'Revoked',
    },
  },
}
