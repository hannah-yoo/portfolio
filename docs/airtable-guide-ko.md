# Airtable 콘텐츠 관리 가이드

사이트는 빌드할 때 Airtable에서 작품, CV, 소개를 읽는다. 브라우저는 Airtable에 직접 연결하지 않는다.

## 현재 테이블

- `collections`: 작품 데이터
- `cv`: 경력 및 활동 데이터
- `intro`: 프로필 소개

`collections`는 테이블 이름이다. 테이블 안 각 행은 작품 한 개다.

## 작품 테이블: `collections`

| 필드 | Airtable 유형 | 용도 |
| --- | --- | --- |
| `order` | 숫자 | 공개할 작품의 분야 안 순서. 비우면 사이트에서 숨김 |
| `category` | 단일 선택 | `design`, `fine-arts`, `photography-video` 중 하나 |
| `title` | 한 줄 텍스트 | 영문 제목 |
| `title ko` | 한 줄 텍스트 | 한국어 제목. 비우면 한국어 제목 숨김 |
| `project term` | 한 줄 텍스트 | 연도 또는 작업 기간 |
| `client` | 긴 텍스트 | 고객 또는 협업 정보 |
| `medium` | 한 줄 텍스트 | 분야나 매체. 쉼표로 여러 값 입력 가능 |
| `hero image` | 첨부파일 | 카드와 상세 페이지 대표 이미지 |
| `image 2`–`image 10` | 첨부파일 | 상세 페이지 추가 이미지. 번호 순으로 표시 |
| `top description` | 긴 텍스트 | 작품 설명 블록 1 |
| `top description after image` | 숫자 | 설명 1을 넣을 위치 |
| `middle description` | 긴 텍스트 | 작품 설명 블록 2 |
| `middle description after image` | 숫자 | 설명 2를 넣을 위치 |
| `bottom description` | 긴 텍스트 | 작품 설명 블록 3 |
| `bottom description after image` | 숫자 | 설명 3을 넣을 위치 |
| `top description ko` 등 | 긴 텍스트 | 각 설명의 한국어 번역. 선택 사항 |
| `description` | 긴 텍스트 | 영문 설명 |
| `tags` | 한 줄 텍스트 | 쉼표로 구분한 태그 |
| `url` | 긴 텍스트 | 외부 링크 |
| `featured` | 체크박스 | 추천 작품 표시 여부 |

설명 위치는 `... after image` 숫자로 작품마다 지정한다. `0`은 대표 이미지 뒤, `1`은 `image 2` 뒤, `2`는 `image 3` 뒤를 뜻한다. `image 10`까지 쓰면 최대 위치는 `9`다. 숫자가 현재 작품의 상세 이미지 수보다 크면 마지막 상세 이미지 뒤에 표시한다. 숫자 필드를 비우면 첫 설명은 대표 이미지 뒤, 두 번째 설명은 이미지 절반 지점, 세 번째 설명은 마지막 이미지 뒤에 표시한다.

한 이미지 필드 칸에 첨부파일을 두 개 넣으면 첨부 순서대로 왼쪽·오른쪽에 나란히 표시한다. 한 개만 넣으면 전체 너비로 표시한다. 세 개 이상이면 첫 이미지를 크게 왼쪽에 두고 나머지를 오른쪽에 세로 타일로 쌓는다. 각 타일은 첨부 순서를 따른다. Markdown 접두사나 `**` 표시는 위치나 레이아웃을 제어하지 않는다.

한국어 설명은 각 필드 이름 뒤에 ` ko`를 붙인 필드에 입력한다. 예: `middle description ko`.

기존 `description`은 `top description`이 비어 있을 때 대표 이미지 뒤에 표시한다. `top description`에 내용이 있으면 기존 `description` 대신 표시한다.

이 필드들은 Airtable에서 각 작품의 내용과 배치를 정한다. 코드는 한 번 수정해 필드 설정을 화면에 반영한다.

현재 테이블에는 `subtitle`, `role`, `timeline` 필드가 없다.

제목이나 카테고리가 없는 행은 무시한다. `order`가 비어 있거나 숫자가 아니면 작품은 사이트에서 숨긴다. 진행 중인 작품은 `order`를 비워 둔다. `order`가 있는 작품만 표시한다. 각 분야는 먼저 나뉘므로 분야마다 `order=1`을 가질 수 있다. 같은 분야 안에서는 고유한 순번을 사용한다.

목록 카드는 Airtable의 최대 3000px 이미지 변형을 사용한다. 상세 페이지는 원본 이미지를 사용한다. 파일은 사이트 저장소에 복사하지 않는다. Airtable 첨부 URL은 약 2시간 뒤 만료되므로 GitHub Actions가 매시간 사이트를 다시 빌드해 URL을 갱신한다.

### 카테고리

- `design`: 디자인 작업
- `fine-arts`: 미술, 일러스트, 글 작업
- `photography-video`: 사진, 영상 제작

`medium`은 현재 작품 상세 페이지에 표시한다. 작품 목록 필터는 없다.

## CV 테이블: `cv`

| 필드 | Airtable 유형 | 용도 |
| --- | --- | --- |
| `order` | 긴 텍스트 | CV 항목 순서. 숫자를 입력 |
| `year` | 긴 텍스트 | 연도 또는 기간 |
| `project` | 서식 있는 텍스트 | 영문 활동명 |
| `project ko` | 서식 있는 텍스트 | 한국어 활동명 |
| `organization` | 긴 텍스트 | 회사, 학교, 기관 |
| `organization ko` | 긴 텍스트 | 한국어 회사, 학교, 기관 |
| `description` | 긴 텍스트 | 영문 상세 설명 |
| `description ko` | 긴 텍스트 | 한국어 상세 설명 |
| `postscript` | 긴 텍스트 | 영문 추가 소개 |
| `postscript ko` | 긴 텍스트 | 한국어 추가 소개 |

`order`가 작은 항목부터 표시한다. 비어 있는 행은 표시하지 않는다.

## 소개 테이블: `intro`

소개글은 한 행에서 관리한다.

| 필드 | Airtable 유형 | 용도 |
| --- | --- | --- |
| `intro` | 긴 텍스트 | 영문 프로필 소개 |
| `intro ko` | 긴 텍스트 | 한국어 프로필 소개 |
| `postscript ko` | 긴 텍스트 | 한국어 추가 소개 |

영문 `postscript`는 `cv` 테이블의 `postscript` 필드에서 읽는다.

## 분야 페이지 문구

분야 페이지 제목과 설명은 Airtable이 아니라 `src/data/airtable-collections.json`에서 관리한다. 영어와 한국어 문구를 바꾸려면 해당 파일을 수정한다.

## 동기화와 배포

Personal Access Token에는 `data.records:read` 권한과 대상 Base 접근 권한이 필요하다. 비밀 토큰을 `VITE_` 변수나 채팅에 넣지 않는다.

프로젝트 루트 `.env`에 다음 값을 둔다.

```env
PORTFOLIO_TOKEN=발급한_토큰
AIRTABLE_BASE_ID=앱_ID
AIRTABLE_TABLE_NAME=collections
AIRTABLE_CV_TABLE_NAME=cv
AIRTABLE_INTRO_TABLE_NAME=intro
```

로컬에서 `npm run sync`를 실행하면 `src/data/airtable-projects.json`, `src/data/airtable-cv.json`을 갱신한다. 스크립트는 Airtable 레코드를 수정하지 않는다.

GitHub Actions 배포 workflow도 위 테이블 이름을 사용한다. GitHub 저장소의 Actions secret에 `PORTFOLIO_TOKEN`을 설정한다.
