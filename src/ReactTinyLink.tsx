import * as React from 'react'
import { Card, ContentWrapper, Header, Content, Footer, UserClickableCard } from './components/Card'
import Description from './components/Description';
import { getHostname, noop, defaultData } from './utils'
import { IReactTinyLinkProps } from './ReactTinyLinkTypes'
import ScraperWraper from './rules'
import CardMedia from './components/CardMedia'
import { useMountFetch } from './useMountFetch';

export const ScrapperWraper = ScraperWraper
export const ReactTinyLink: React.FC<IReactTinyLinkProps> = ({
  cardSize = 'small',
  maxLine = 2,
  minLine = 1,
  header = null,
  description = null,
  url = '',
  width = '640px',
  proxyUrl = 'https://cors-anywhere.herokuapp.com',
  showGraphic = true,
  autoPlay = false,
  defaultMedia = '',
  loadSecureUrl = false,
  onError = noop, // Permit to keep a constant reference
  onSuccess = noop,
  onClick = null,
}: IReactTinyLinkProps) => {

  const defaultMediaArr = defaultMedia ? [defaultMedia] : []
  const [data, loading] = useMountFetch(
    url, proxyUrl, defaultMediaArr, defaultData(url, defaultMediaArr), onError, onSuccess)

  return (
    <>
      {!onClick && <Card className="react_tinylink_card" cardSize={cardSize} href={url} width={width} isShownGraphic={showGraphic}>
        {showGraphic && <CardMedia autoPlay={autoPlay} cardSize={cardSize} data={data} loadSecureUrl={loadSecureUrl} />}
        <ContentWrapper className="react_tinylink_card_content_wrapper" cardSize={cardSize}>
          <Header maxLine={maxLine} minLine={minLine} className="react_tinylink_card_content_header">
            <Description
              loading={loading}
              loadingWidth={2}
              maxLine={maxLine}
              minLine={minLine}
              className="react_tinylink_card_content_header_description"
            >
              {header ? header : data.title ? data.title : url}
            </Description>
          </Header>
          <Content maxLine={maxLine} minLine={minLine} className="react_tinylink_card_content" cardSize={cardSize}>
            <Description loading={loading} loadingWidth={1} className="react_tinylink_card_content_description">
              {description ? description : data.description ? data.description : url}
            </Description>
          </Content>
          <Footer className="react_tinylink_footer">
            <Description loading={loading} loadingWidth={1} className="react_tinylink_card_footer_description">
              {getHostname(url)}
            </Description>
          </Footer>
        </ContentWrapper>
      </Card>}
      {onClick && <UserClickableCard onClick={(e) => { e.preventDefault(); onClick(e, data) }} className="react_tinylink_card" cardSize={cardSize} href={url} width={width} isShownGraphic={showGraphic}>
        {showGraphic && <CardMedia autoPlay={autoPlay} cardSize={cardSize} data={data} loadSecureUrl={loadSecureUrl} />}
        <ContentWrapper className="react_tinylink_card_content_wrapper" cardSize={cardSize}>
          <Header maxLine={maxLine} minLine={minLine} className="react_tinylink_card_content_header">
            <Description
              loading={loading}
              loadingWidth={2}
              maxLine={maxLine}
              minLine={minLine}
              className="react_tinylink_card_content_header_description"
            >
              {header ? header : data.title ? data.title : url}
            </Description>
          </Header>
          <Content maxLine={maxLine} minLine={minLine} className="react_tinylink_card_content" cardSize={cardSize}>
            <Description loading={loading} loadingWidth={1} className="react_tinylink_card_content_description">
              {description ? description : data.description ? data.description : url}
            </Description>
          </Content>
          <Footer className="react_tinylink_footer">
            <Description loading={loading} loadingWidth={1} className="react_tinylink_card_footer_description">
              {getHostname(url)}
            </Description>
          </Footer>
        </ContentWrapper>
      </UserClickableCard>
      }
    </>
  )
}
