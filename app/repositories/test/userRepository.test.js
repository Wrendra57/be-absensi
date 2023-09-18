const userRepository = require("../userRepository");
const Uuid = require("../../utils/uuid");
describe("createUser Repository", () => {
  afterEach(async () => {
    console.log("jalan");
    await userRepository.destroyAll("testing");
  });
  it("should create user to db", async () => {
    const uuid = await Uuid.Generate();
    const payload = {
      uuid: uuid,
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);

    expect(createUser).not.toEqual(null);
    expect(createUser.uuid).toEqual(uuid);
    expect(createUser.name).toEqual(payload.name);
    expect(createUser.email).toEqual(payload.email);
    expect(createUser.is_enabled).toEqual(payload.is_enabled);
    expect(createUser.role).toEqual(payload.role);
    expect(createUser.password).toEqual(payload.password);
    return;
  });
  it("gagal create user to db", async () => {
    const uuid = await Uuid.Generate();
    const payload = {
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);

    expect(createUser.data).toEqual(null);
    expect(createUser.status).toEqual(500);
    return;
  });
  it("Duplicate email", async () => {
    const uuid1 = await Uuid.Generate();
    const uuid2 = await Uuid.Generate();
    const payload1 = {
      uuid: uuid1,
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const payload2 = {
      uuid: uuid2,
      name: "testing2",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser1 = await userRepository.createUser(payload1);
    const createUser2 = await userRepository.createUser(payload2);

    expect(createUser2.data).toEqual(null);
    expect(createUser2.status).toEqual(500);
    return;
  });
  it("Duplicate uuid", async () => {
    const uuid1 = await Uuid.Generate();

    const payload1 = {
      uuid: uuid1,
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const payload2 = {
      uuid: uuid1,
      name: "testing2",
      email: "testing2ssa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser1 = await userRepository.createUser(payload1);
    const createUser2 = await userRepository.createUser(payload2);

    expect(createUser2.data).toEqual(null);
    expect(createUser2.status).toEqual(500);
    return;
  });
});
describe("getUserByUUID Repository", () => {
  afterEach(async () => {
    console.log("jalan");
    await userRepository.destroyAll("testing");
  });
  it("should success get user by uuid", async () => {
    const uuid = await Uuid.Generate();
    const payload = {
      uuid: uuid,
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);
    const getUser = await userRepository.getUserByUUID(uuid);

    expect(getUser).not.toEqual(null);
    expect(createUser.uuid).toEqual(uuid);
    expect(getUser.name).toEqual(payload.name);
    expect(getUser.email).toEqual(payload.email);
    expect(getUser.is_enabled).toEqual(payload.is_enabled);
    expect(getUser.role).toEqual(payload.role);
    expect(getUser.password).toEqual(payload.password);
    return;
  });
  it("should can't get user by uuid", async () => {
    const uuid = await Uuid.Generate();
    const uuid2 = await Uuid.Generate();
    const payload = {
      uuid: uuid,
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);
    const getUser = await userRepository.getUserByUUID(uuid2);

    expect(getUser).toEqual(null);

    return;
  });
  it("should server eror", async () => {
    const uuid = await Uuid.Generate();
    const payload = {
      uuid: uuid,
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);
    const getUser = await userRepository.getUserByUUID({ uuid: payload.uuid });
    console.log(getUser);
    console.log("getUser");

    expect(getUser.status).toEqual(500);
    expect(getUser.data).toEqual(null);
    return;
  });
});

describe("getUserByEmail Repository", () => {
  afterEach(async () => {
    console.log("jalan");
    await userRepository.destroyAll("testing");
  });
  it("should success get user by email", async () => {
    const uuid = await Uuid.Generate();
    const payload = {
      uuid: uuid,
      name: "testing",
      email: "testing2@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);
    const getUser = await userRepository.getUserByEmail("testing2@gmail.com");

    expect(getUser).not.toEqual(null);
    // expect(createUser.uuid).toEqual(uuid);
    expect(getUser.name).toEqual(payload.name);
    expect(getUser.email).toEqual(payload.email);
    expect(getUser.is_enabled).toEqual(payload.is_enabled);
    expect(getUser.role).toEqual(payload.role);
    expect(getUser.password).toEqual(payload.password);
    return;
  });
  it("should unfind getUsermail", async () => {
    const uuid = await Uuid.Generate();

    const payload = {
      uuid: uuid,
      name: "testing",
      email: "testing2sa@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);
    const getUser = await userRepository.getUserByEmail(
      "testing2sa@gmail.coms"
    );

    expect(getUser).toEqual(null);

    return;
  });
  it("should server eror", async () => {
    const uuid = await Uuid.Generate();
    const payload = {
      uuid: uuid,
      name: "testing",
      email: "testing2@gmail.com",
      password: "1234",
      is_enabled: true,
      role: "member",
    };
    const createUser = await userRepository.createUser(payload);
    const getUser = await userRepository.getUserByEmail({
      email: payload.email,
    });

    expect(getUser.status).toEqual(500);
    expect(getUser.data).toEqual(null);

    return;
  });
});

