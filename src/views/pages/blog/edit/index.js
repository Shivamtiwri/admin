// ** React Imports
import {useState, useEffect, Fragment} from 'react';

// ** Third Party Components
import axios from 'axios';
import Select from 'react-select';
import htmlToDraft from 'html-to-draftjs';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, ContentState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {toast, Slide} from 'react-toastify';

// ** Custom Components
import Avatar from '@components/avatar';
import Breadcrumbs from '@components/breadcrumbs';

// ** Utils
import {selectThemeColors} from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/base/plugins/forms/form-quill-editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/base/pages/page-blog.scss';

import {End_Urls} from '../../../../Config/End_Urls';
import AxiosConfigadmin from '../../../../Config/AxiosConfig copy';
import {Redirect} from 'react-router-dom';

const BlogEdit = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('');
  const [content, setContent] = useState('');
  const [blogCategories, setBlogCategories] = useState([]);
  const [featuredImg, setFeaturedImg] = useState(null);
  const [imgPath, setImgPath] = useState(null);

  const onEditorStateChange = state => {
    setEditorState(state);
    const rawContentState = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(rawContentState);
    setContent(html);
  };

  useEffect(() => {
    axios.get('/blog/list/data/edit').then(res => {
      setData(res.data);
      // setTitle(res.data.blogTitle);
      // setSlug(res.data.slug);
      // setBlogCategories(res.data.blogCategories);
      // setFeaturedImg(res.data.featuredImage);
      setStatus(res.data.status);
    });
  }, []);

  const categories = [
    {value: 'fashion', label: 'Fashion'},
    {value: 'gaming', label: 'Gaming'},
    {value: 'quote', label: 'Quote'},
    {value: 'video', label: 'Video'},
    {value: 'food', label: 'Food'},
  ];

  const ToastContent = ({name}) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar
            size="sm"
            color="success"
            icon={<i className="fas fa-coffee"></i>}
          />
          <h6 className="toast-title fw-bold">{name}</h6>
        </div>
      </div>
    </Fragment>
  );

  const addBlog = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('meta_title', slug);
    formData.append('description', content);
    formData.append('image', imgPath);

    AxiosConfigadmin.post(End_Urls.addblog, formData)
      .then(res => {
        toast.success(<ToastContent name={res.data.msg} />, {
          icon: false,
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        });
        <Redirect to="/pages/blog/list" />;
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onChangeImage = e => {
    const reader = new FileReader();
    const files = e.target.files;

    if (files && files[0]) {
      setImgPath(files[0]);
      reader.onload = () => setFeaturedImg(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        breadCrumbTitle="Blog Edit"
        breadCrumbParent="Pages"
        breadCrumbParent2="Blog"
        breadCrumbActive="Edit"
      />
      {data && (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex">
                  <Avatar
                    className="me-75"
                    img={data.avatar}
                    imgWidth="38"
                    imgHeight="38"
                  />
                  <div>
                    <h6 className="mb-25">{data.userFullName}</h6>
                    <CardText>{data.createdTime}</CardText>
                  </div>
                </div>
                <Form className="mt-2" onSubmit={e => e.preventDefault()}>
                  <Row>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-title">
                        Title
                      </Label>
                      <Input
                        id="blog-edit-title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                    </Col>

                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-slug">
                        Slug
                      </Label>
                      <Input
                        id="blog-edit-slug"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                      />
                    </Col>

                    <Col sm="12" className="mb-2">
                      <Label className="form-label">Content</Label>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                      />
                    </Col>

                    <Col sm="12" className="mb-2">
                      <div className="border rounded p-2">
                        <h4 className="mb-1">Featured Image</h4>
                        <div className="d-flex flex-column flex-md-row">
                          {featuredImg && (
                            <img
                              className="rounded me-2 mb-1 mb-md-0"
                              src={featuredImg}
                              alt="Featured"
                              width="170"
                              height="110"
                            />
                          )}
                          <div>
                            <small className="text-muted">
                              Required image resolution 800x400, image size
                              10mb.
                            </small>
                            <Input
                              type="file"
                              onChange={onChangeImage}
                              accept=".jpg, .png, .gif"
                            />
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col className="mt-50">
                      <Button
                        onClick={addBlog}
                        color="primary"
                        className="me-1">
                        Save Changes
                      </Button>
                      <Button color="secondary" outline>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BlogEdit;
