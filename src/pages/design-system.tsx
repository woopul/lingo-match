type ColorMapType = {
  [key: string]: string;
};

// workaround for tailwind which doesn't support dynamic classes during rendering
const primaryColors: ColorMapType = {
  '50': 'bg-primary-50',
  '100': 'bg-primary-100',
  '200': 'bg-primary-200',
  '300': 'bg-primary-300',
  '400': 'bg-primary-400',
  '500': 'bg-primary-500',
  '600': 'bg-primary-600',
  '700': 'bg-primary-700',
  '800': 'bg-primary-800',
  '900': 'bg-primary-900',
  '950': 'bg-primary-950',
};

const secondaryColors: ColorMapType = {
  '50': 'bg-secondary-50',
  '100': 'bg-secondary-100',
  '200': 'bg-secondary-200',
  '300': 'bg-secondary-300',
  '400': 'bg-secondary-400',
  '500': 'bg-secondary-500',
  '600': 'bg-secondary-600',
  '700': 'bg-secondary-700',
  '800': 'bg-secondary-800',
  '900': 'bg-secondary-900',
  '950': 'bg-secondary-950',
};

export default function DesignSystem() {
  return (
    <main className="px-6 pb-10">
      <h2 className="text-6xl w-full text-center font-bold mt-6 mb-8">Design System</h2>
      <div className="grid w-full grid-cols-2 auto-rows-auto mt-2 gap-2">
        <div>
          <h2 className="mb-2">fonts</h2>
          <div className="[&>*]:py-2 [&>*]:break-words border border-b-indigo-200 rounded-md px-2">
            <h1>This is H1</h1>
            <h2>This is H2</h2>
            <h3>This is H3</h3>
            <h4>This is H4</h4>
            <h5>This is H5</h5>
            <h6>This is H6</h6>
            <p>This is a paragraph</p>
            <p className="text-hero">.text-hero class on paragraph</p>
            <p className="text-h1">.text-h1 class on paragraph</p>
            <p className="text-h2">.text-h2 class on paragraph</p>
            <p className="text-h3">.text-h3 class on paragraph</p>
            <p className="text-h4">.text-h4 class on paragraph</p>
            <p className="text-preamble">
              .preamble class on paragraph. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Beatae inventore repellendus sed tenetur vel. Ad blanditiis exercitationem ipsa
              labore porro!
            </p>
            <p className="text-paragraph">
              .text-paragraph class on paragraph. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Adipisci architecto distinctio est iure perspiciatis sunt tempora.
              Eos ipsum neque nisi!
            </p>
            <p className="text-small">
              .text-small class on paragraph. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Adipisci architecto distinctio est iure perspiciatis sunt tempora. Eos ipsum
              neque nisi!
            </p>
            <p className="text-xsmall">
              .text-xsmall class on paragraph. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Adipisci architecto distinctio est iure perspiciatis sunt tempora. Eos ipsum
              neque nisi!
            </p>
          </div>
        </div>
        <div>
          <h2 className="mb-2">colors</h2>
          <div className="border border-b-indigo-200 min-h-[20rem] rounded-md p-2">
            <h4 className="py-2">primary</h4>
            {Object.keys(primaryColors).map((el) => (
              <div
                key={`bg-primary-${el}`}
                className={`${primaryColors[el]} inline-block mr-1 rounded-md w-5 h-5 border-b-indigo-100 py-2`}
              ></div>
            ))}

            <h4 className="py-2">secondary</h4>
            {Object.keys(secondaryColors).map((el) => (
              <div
                key={`bg-primary-${el}`}
                className={`${secondaryColors[el]} inline-block mr-1 rounded-md w-5 h-5 border-b-indigo-100 py-2`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
