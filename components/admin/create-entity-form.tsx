import AdminListCard from "./list-card";

type Field = {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "number" | "url";
};

type CreateEntityFormProps = {
  entityName: string;
  fields: Field[];
};

const CreateEntityForm = ({
  entityName,
  fields,
}: CreateEntityFormProps) => {
  return (
    <AdminListCard>
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">
          {entityName} details
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter the information below. Data persistence can be connected when
          the backend is ready.
        </p>
      </div>

      <form className="mt-6 grid max-w-3xl gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {field.label}
            </span>
            <input
              type={field.type ?? "text"}
              name={field.name}
              placeholder={field.placeholder}
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </label>
        ))}

        <div className="flex gap-3 sm:col-span-2">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Save {entityName.toLowerCase()}
          </button>
          <button
            type="reset"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </form>
    </AdminListCard>
  );
};

export default CreateEntityForm;
