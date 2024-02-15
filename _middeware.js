import { NextResponse } from '@vercel/edge';

export const config = {
  // Specify the matcher for the routes you want to redirect
  matcher: '/:lang/post/:postName*',
};

const getPost = async (slug) => {
  const _resp = await axios.get(
    process.env.GATSBY_BREATHECODE_HOST + `/registry/asset/${slug}`,
    options
  );
  if (_resp.status != 200) {
    logger.error(_resp.data);
    throw new Error(_resp.data);
  }

  return _resp.data;
};

export default function middleware(request) {
  const { nextUrl } = request;
  const [ postLang, _, postSlug] = nextUrl.pathname.split('/')[3];

  const post = getPost()

  // Construct the destination URL
  const destinationUrl = `/us/post_topic_cluster/${postSlug}`;
  return NextResponse.redirect(new URL(destinationUrl, request.url));
}
