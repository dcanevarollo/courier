class UploadFile {
  get rules() {
    return {
      file:
        'required|file|file_ext:jpg,png,jpeg,JPG,JPEG|file_size:5mb|file_types:image',
    };
  }

  get messages() {
    return {
      required: 'Provide a valid file',
    };
  }
}

module.exports = UploadFile;
