const requiredRule= { required: true, message: '该选项必填!', trigger: 'blur' };
const max100Rule= { max: 100, message: '太长了惹！请控制在100以内', trigger: 'blur' }

export {
  requiredRule,
  max100Rule
}