export function make_it_unique(id = "") {
    const ret = id + v4()
    return ret
}

export function custom_str(s = "") {
    if(s.length >= 150) return s.substring(0, 150) + "..."
    return s;
}