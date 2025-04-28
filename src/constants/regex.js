/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable prettier/prettier */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
const VALID_MONGOOSE_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const VALID_EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const VALID_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*\d)[\w\S]{6,}$/;

const VALID_NAME_REGEX =
  /^[\wa-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{1,30}$/g;

module.exports = {
  VALID_MONGOOSE_ID_REGEX,
  VALID_EMAIL_REGEX,
  VALID_PASSWORD_REGEX,
  VALID_NAME_REGEX,
};
