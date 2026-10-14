# Airtable 콘텐츠 관리 가이드

이 사이트는 Airtable의 작품과 CV 데이터를 빌드할 때 가져온다. 브라우저가 Airtable에 직접 연결하지는 않는다.

## 기본 규칙

- 작품 테이블: `Artworks_eng`
- CV 테이블: `cv_eng`
- 한 작품은 작품 테이블의 한 행으로 관리한다.
- 필드 이름은 소문자와 공백을 권장한다. 예: `hero image`, `image 2`, `external url`
- 필드 이름은 대소문자를 구분하지 않는다. 공백, 밑줄, 하이픈도 정규화한다. 그래도 아래 이름을 그대로 쓰는 편이 가장 안전하다.
- `Grid width`는 현재 Airtable에서 읽지 않는다. 삭제해도 된다.

## 작품 테이블

`Artworks_eng`에 작품마다 한 행을 만든다.

| 필드 이름 | Airtable 필드 유형 | 설명 |
| --- | --- | --- |
| `title` | 한 줄 텍스트 | 작품 제목 |
| `subtitle` | 한 줄 텍스트 | 짧은 설명 |
| `year` | 한 줄 텍스트 또는 날짜 | 표시할 연도 |
| `category` | 한 줄 텍스트 또는 단일 선택 | `design`, `fine-arts`, `broadcasts` 중 하나 |
| `hero image` | 첨부파일 | 목록 카드와 상세 페이지에 쓰는 대표 이미지 1장 |
| `image 2` | 첨부파일 | 상세 페이지 두 번째 이미지 1장 |
| `image 3` | 첨부파일 | 상세 페이지 세 번째 이미지 1장 |
| `image 4` | 첨부파일 | 상세 페이지 네 번째 이미지 1장 |
| `image 5` | 첨부파일 | 상세 페이지 다섯 번째 이미지 1장 |
| `image 6` | 첨부파일 | 상세 페이지 여섯 번째 이미지 1장 |
| `description` | 긴 텍스트 | 작품 설명 |
| `role` | 한 줄 텍스트 | 맡은 역할. 여러 역할은 쉼표로 구분 |
| `team` | 한 줄 텍스트 | 팀, 고객 또는 협업자 |
| `timeline` | 한 줄 텍스트 | 작업 기간 |
| `tags` | 한 줄 텍스트 또는 다중 선택 | 필터용 태그. 여러 태그는 쉼표로 구분 |
| `featured` | 체크박스 또는 텍스트 | 추천 작품 여부 |
| `url` | URL | 외부 작업 링크. 방송 링크 등에 사용 |

### 사진 올리기

1. 대표 이미지에는 `hero image` 필드에 사진 한 장을 첨부한다.
2. 상세 이미지는 `image 2`부터 번호 순서대로 각 필드에 한 장씩 첨부한다.
3. 상세 사진 순서를 바꾸려면 첨부파일을 다른 번호 필드로 옮긴다. 예를 들어 세 번째 사진을 먼저 보여주려면 그 파일을 `image 2`에 둔다.
4. 사진을 6장보다 많이 보여주려면 추가 필드와 코드 지원이 필요하다.

새 번호 필드에 사진이 하나라도 있으면 사이트는 `image 2`부터 `image 6`까지를 사용한다. 번호 필드가 모두 비어 있을 때만 기존 `images` 다중 첨부 필드를 fallback으로 읽는다. 새 필드로 옮긴 뒤에는 기존 `images` 필드를 삭제해도 된다.

상세 이미지 비율은 원본 크기로 표시한다. Airtable 첨부 이미지는 동기화 시 `public/airtable-media`에 복사된다.

### 카테고리 값

- `design`: 디자인 작업
- `fine-arts`: 미술, 일러스트, 글 작업
- `broadcasts`: 방송, 인터뷰, 팟캐스트 등

사이트는 카테고리 값으로 화면과 필터를 정한다. 다른 표현을 쓰면 기본값인 `fine-arts`로 분류될 수 있으니 위 값을 사용한다.

## CV 테이블

`cv_eng`에 경력이나 활동마다 한 행을 만든다.

| 필드 이름 | Airtable 필드 유형 | 설명 |
| --- | --- | --- |
| `order` | 숫자 | 표시 순서. 작을수록 먼저 표시 |
| `year` | 한 줄 텍스트 | 연도 또는 기간 |
| `title` | 한 줄 텍스트 | 직함, 활동, 학위 |
| `organization` | 한 줄 텍스트 | 회사, 학교, 고객 또는 기관 |
| `description` | 긴 텍스트 | 상세 설명 |
| `intro` | 긴 텍스트 | 소개글. 한 행에만 입력 |
| `postscript` | 긴 텍스트 | 소개 뒤에 나오는 추가 문단. 한 행에만 입력 |

CV 항목은 `order` 순으로 표시한다. `intro`와 `postscript`는 여러 행에 중복 입력하지 말고 각각 한 행에만 입력한다.

## 로컬 동기화

Airtable Personal Access Token에 `data.records:read` 권한을 주고, 포트폴리오 Base에 접근 권한을 설정한다. 토큰은 채팅이나 코드에 넣지 않는다.

프로젝트 루트의 `.env`에 다음 값을 저장한다. `.env`는 Git에 올라가지 않는다.

```env
PORTFOLIO_TOKEN=발급한_토큰
AIRTABLE_BASE_ID=앱_ID
AIRTABLE_TABLE_NAME=Artworks_eng
AIRTABLE_CV_TABLE_NAME=cv_eng
```

`PORTFOLIO_TOKEN`에 `VITE_` 접두사를 붙이지 않는다. 접두사를 붙이면 비밀 토큰이 브라우저 코드에 포함될 수 있다.

작업물 데이터를 가져오려면 프로젝트 폴더에서 실행한다.

```bash
npm run sync
```

이 명령은 Airtable을 읽고 `src/data/airtable-projects.json`, `src/data/airtable-cv.json`을 갱신한다. 이미지도 `public/airtable-media`에 내려받는다. 이 스크립트는 Airtable 레코드를 수정하지 않는다.

로컬에서 화면을 확인하려면:

```bash
npm run dev
```

GitHub Pages에 게시하려면 GitHub 저장소의 Actions secret에 `PORTFOLIO_TOKEN`을 추가하고 배포 workflow를 실행한다. 배포 빌드가 Airtable에서 다시 동기화한다.

## 자주 생기는 문제

- 데이터가 바뀌지 않음: 토큰, Base 접근 권한, 테이블 이름을 확인하고 `npm run sync`를 실행한다.
- 이미지가 안 나옴: 필드 유형이 첨부파일인지, 필드 이름이 `hero image` 또는 `image 2` 형식인지 확인한다.
- 카테고리가 잘못 표시됨: `category`에 `design`, `fine-arts`, `broadcasts` 중 하나를 입력한다.
- 동기화에 실패함: PAT에 `data.records:read` 권한이 있는지, 대상 Base에 접근 가능한지 확인한다.

게시된 작품과 이미지는 공개 웹사이트에서 누구나 볼 수 있다. Airtable 토큰만 비밀로 관리한다.
