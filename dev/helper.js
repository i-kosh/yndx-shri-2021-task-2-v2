("use strict");

(async function () {
  if (window) {
    try {
      const db = new Dexie("test_db");
      db.version(1).stores({
        data: "key, value",
      });

      window._outdata_ = await db.data
        .get({ key: "_outdata_" })
        .catch((e) => {});
      window._data_ = await db.data.get({ key: "_data_" }).catch((e) => {});

      if (!window._outdata_) {
        const outDataResponce = await fetch(
          "http://localhost:8887/output.json?static=1"
        );
        window._outdata_ = await outDataResponce.json();
        await db.data.put({ key: "_outdata_", value: window._outdata_ });
        console.log(`_outdata_ loaded`);
      } else {
        console.log(`_outdata_ CACHE`);
        window._outdata_ = window._outdata_.value;
      }

      if (!window._data_) {
        const dataResponce = await fetch(
          "http://localhost:8887/input.json?static=1"
        );
        window._data_ = await dataResponce.json();
        await db.data.put({ key: "_data_", value: window._data_ });

        console.log(`_data_ loaded`);
      } else {
        console.log(`_data_ CACHE`);
        window._data_ = window._data_.value;
      }

      window._test();
    } catch (error) {
      console.log(error);
    }
  }
})();
