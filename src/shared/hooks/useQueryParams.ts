import { useSearchParams } from "react-router-dom";

export type QueryParamValue = string | string[] | number | null;

export type QueryParamsPatch = Record<string, QueryParamValue>;

const _serialize = (value: QueryParamValue) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(",");
  }

  return value === null ? "" : String(value).trim();
};

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const _getParam = (key: string, fallback = "") =>
    searchParams.get(key)?.trim() || fallback;

  const _getListParam = (key: string) => {
    const raw = _getParam(key);

    return raw ? raw.split(",").filter(Boolean) : [];
  };

  const _getNumberParam = (key: string, fallback: number) => {
    const parsed = Number(_getParam(key));

    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
  };

  const _setParams = (patch: QueryParamsPatch) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      const serialized = _serialize(value);

      if (serialized === "") {
        next.delete(key);
        return;
      }

      next.set(key, serialized);
    });

    setSearchParams(next, { replace: true });
  };

  return {
    __queryString: searchParams.toString(),
    __getParam: _getParam,
    __getListParam: _getListParam,
    __getNumberParam: _getNumberParam,
    __setParams: _setParams,
  };
};

export default useQueryParams;
